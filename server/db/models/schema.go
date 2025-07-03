package models

import (
	"time"

	"gorm.io/gorm"
)

type Schema struct {
	gorm.Model
	Id     	 string `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
	
}