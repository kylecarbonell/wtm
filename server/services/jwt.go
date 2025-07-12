package services

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/kylecarbonell/wtm/types"
)

func GenerateToken(newUser types.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": newUser.Id,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // expires in 3 days
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return ""
	}

	return tokenString
}