package types

import "github.com/google/uuid"

type User struct {
	Id		 uuid.UUID `json:"id"`
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
	Username string `json:"username" validate:"required"`
}

type LoginInput struct{
	Identifier    string `json:"identifier" validate:"required"`
	Password string `json:"password" validate:"required,min=6"`
}