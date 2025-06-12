package handlers

import (
	"fmt"
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request for /")
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprint(w, "hello from /")
}
