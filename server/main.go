package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/kylecarbonell/wtm/routes"
)

func main() {
  err := godotenv.Load()
  router := gin.Default()
  api := router.Group("/api/v1")

  routes.RegisterRoutes(api)
  
  if err != nil {
	log.Fatal("❌ Error loading .env file")
  }

  port := os.Getenv("PORT")
  if port == ""{
	port = "8080"
  }

  fmt.Println("Server running on port " + port)

  router.Run(`localhost:` + port) 
}