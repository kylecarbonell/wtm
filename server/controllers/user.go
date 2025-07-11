package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
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
	user := c.MustGet("data").(types.User)

	log.Println(user)

	c.JSON(200, user)
	return
}

