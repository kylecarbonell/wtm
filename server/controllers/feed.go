package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func GetUsers(c *gin.Context) {
	// dummy response
	c.JSON(http.StatusOK, gin.H{"users": []string{"Alice", "Bob"}})
}