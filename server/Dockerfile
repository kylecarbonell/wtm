FROM golang:1.24

# Install Air (live reload)
RUN go install github.com/air-verse/air@latest

WORKDIR /app

# Preload go deps
COPY go.mod go.sum ./
RUN go mod download

# Copy source
COPY . .
RUN go build . 

EXPOSE 8080

CMD ["air"]
