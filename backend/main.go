package main

import (
	"log"
	"net/http"
	"shaadi-saga/handlers"
)

func main() {
	http.HandleFunc("/", handlers.HomeHandler)
	log.Println("Route / registered")
	server := &http.Server{
		Addr:    ":8080",
		Handler: http.DefaultServeMux,
	}
	log.Println("Server started at port..", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Could not start server: %v", err)
	}
	log.Println("Server stopped ...")
}
