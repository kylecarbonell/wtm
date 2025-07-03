package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/kylecarbonell/wtm/db"
	"github.com/kylecarbonell/wtm/routes"
)

func main() {
  db.Connect()

  gin.SetMode(gin.ReleaseMode)
  err := godotenv.Load()
  router := gin.New()
  api := router.Group("/api/v1")

  routes.RegisterRoutes(api)
  
  if err != nil {
	log.Fatal("❌ Error loading .env file")
  }

  host := os.Getenv("HOST")
  if host == ""{
	host = "0.0.0.0:8080"
  }

  log.Println("Server running on " + host)

  router.Run(host) 
}