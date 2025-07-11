package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"github.com/kylecarbonell/wtm/db"
	"github.com/kylecarbonell/wtm/db/models"
	"github.com/kylecarbonell/wtm/services"
	"github.com/kylecarbonell/wtm/types"
)

func CreateUser(c *gin.Context){
	user := c.MustGet("data").(types.User) 
	newPass, err := services.HashPassword(user.Password)

	if err != nil{
		c.JSON(400, "Error hashing password")
	}

	user.Password = newPass
	user.Id = uuid.New()

	log.Println(user)

	var check []models.User
	db.DB.Where("email = ?", user.Email).Find(&check)

	if len(check) != 0{
		c.JSON(400, "Email already exists")
		return
	}
	

	res := db.DB.Create(&user)

	if res.Error != nil{
		c.JSON(400, res.Error.Error())
	}

	c.JSON(http.StatusOK, fmt.Sprintf("User %s created", user.Name))
}

func Authenticate(c *gin.Context){
	user := c.MustGet("data").(types.LoginInput)
	var newUser types.User;

	findUser := db.DB.Where("email = ? ", user.Identifier).Or("username = ? ", user.Identifier).Find(&newUser)

	if findUser.Error != nil{
		c.JSON(404, "Username or Email does not exist")
		return
	}


	checkPw := services.ComparePassword(user.Password, newUser.Password)
	if !checkPw{
		c.JSON(403, "Incorrect password!")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": newUser.Id,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // 3-day expiry
	})
	
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(400, gin.H{"error": "Failed to generate token"})
		return 
	}

	log.Println("THIS OS OT", tokenString)

	c.JSON(200, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":    newUser.Id,
			"name":  newUser.Name,
			"email": newUser.Email,
		},
	})
	return
}

