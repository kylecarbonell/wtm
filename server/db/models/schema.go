package models

import (
	"time"

	"gorm.io/gorm"
)

type Schema struct {
	gorm.Model
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
	
}