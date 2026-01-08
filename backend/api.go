package main

import (
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte("Server is running..."))
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("Couldn't write the response..."))
	}
}
