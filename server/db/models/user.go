package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Schema
	Name string
	Email string `gorm:"uniqueIndex"`
	Password string
	Username string
}