package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kylecarbonell/wtm/middleware"
)

func GetFeedRoutes(router *gin.RouterGroup){
	api := router.Group("/feed")
	{
		api.GET("/", middleware.Auth())
	}
}