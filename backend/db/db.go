package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/nedpals/supabase-go"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading the .env file: %v", err)
	}
	supabase_url := os.Getenv("SUPABASE_URL")
	supabase_key := os.Getenv("SUPABASE_KEY")
	supabase := supabase.CreateClient(supabase_url, supabase_key)
	_ = supabase
	fmt.Println("Supabase client created successfully")
}
