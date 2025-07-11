package models

type User struct {
	Schema
	ID      string `gorm:"type:uuid;primaryKey;" json:"id"`
	Name string
	Email string `gorm:"uniqueIndex"`
	Password string
	Username string `gorm:"uniqueIndex"`
}