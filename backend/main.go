package main

import (
	"fmt"
	"github.com/evok02/blogger/internal/api"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	c, err := api.NewApiConfig()
	if err != nil {
		log.Fatal(err)
	}

	defer c.Storage.Close()
	r := mux.NewRouter()

	http.Handle("/", r)
	r.HandleFunc("/", c.HomeHandler).Methods("POST")
	r.HandleFunc("/posts", c.HandleGetArticles).Methods("GET")
	r.HandleFunc("/post", c.HandleCreatePost).Methods("POST")

	fmt.Printf("Listen on port %s...\n", c.Server.Addr)
	err = c.Server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
