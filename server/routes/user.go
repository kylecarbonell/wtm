package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kylecarbonell/wtm/controllers"
	"github.com/kylecarbonell/wtm/db/validators"
)

func GetUserRoutes(router *gin.RouterGroup){
	api := router.Group("/user")
	{
		api.POST("", validators.ValidateUser, controllers.CreateUser)
		api.POST("/auth", validators.ValidateLogin, controllers.Authenticate)
	}
}