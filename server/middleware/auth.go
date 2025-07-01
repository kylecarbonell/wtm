package middleware

import (
	"log"

	"github.com/gin-gonic/gin"
)


func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Do something before the handler
		log.Println("Middleware triggered")

		// Continue to the next middleware/handler
		c.Next()

		// Optionally, do something after
	}
}