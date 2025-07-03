package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Schema
	Caption  *string
	Image_url *string
}