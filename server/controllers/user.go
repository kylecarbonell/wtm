package controllers

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kylecarbonell/wtm/db"
	"github.com/kylecarbonell/wtm/db/models"
	"github.com/kylecarbonell/wtm/services"
	"github.com/kylecarbonell/wtm/types"
)

func CreateUser(c *gin.Context){
	log.Println("HERE")
	user := c.MustGet("data").(types.User) 
	newPass, err := services.HashPassword(user.Password)
	
	log.Println(user)

	if err != nil{
		c.JSON(400, "Error hashing password")
		return
	}

	user.Password = newPass
	user.Id = uuid.New()

	log.Println(user)

	var checkEmail []models.User
	db.DB.Where("email = ?", user.Email).First(&checkEmail)

	if len(checkEmail) != 0 {
		c.JSON(400, "Email already exists")
		return
	}

	var checkUser []models.User
	db.DB.Where("username = ?", user.Username).First(&checkUser)

	if len(checkUser) != 0 {
		c.JSON(400, "Username already exists")
		return
	}
	

	res := db.DB.Create(&user)

	if res.Error != nil{
		c.JSON(400, res.Error.Error())
		return
	}

	tokenString := services.GenerateToken(user)
	log.Println("THIS IS TOKEN", tokenString)
	c.JSON(200, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":    user.Id,
			"name":  user.Name,
			"email": user.Email,
		},
		"message": fmt.Sprintf("User %s created", user.Username),
	})
	return
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

	tokenString := services.GenerateToken(newUser)



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

