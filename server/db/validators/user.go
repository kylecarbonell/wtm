package validators

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/kylecarbonell/wtm/types"
)


func ValidateUser(c *gin.Context){
	var user types.User

	if err := c.ShouldBindBodyWithJSON(&user); err != nil{
		c.JSON(400, gin.H{"error": "Invalid JSON"})
		return
	}

	var validate = validator.New()
	if err := validate.Struct(user); err != nil {
		errors := make(map[string]string)
		for _, err := range err.(validator.ValidationErrors) {
			errors[err.Field()] = fmt.Sprintf("failed on '%s' validation", err.Tag())
		}

		c.JSON(400, errors)
		c.Abort()
		return
	}

	log.Println(user)
	c.Set("data", user)
	c.Next()
}
