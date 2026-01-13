package main

import (
	"fmt"
	"github.com/evok02/blogger/internal/api"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
)

func main() {
	godotenv.Load()
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
	r.HandleFunc("/post", c.HandleGetPostById).Methods("GET")
	r.HandleFunc("/user", c.HandleCreateUser).Methods("POST")
	r.HandleFunc("/user", c.HandleGetUser).Methods("GET")
	r.HandleFunc("/users", c.HandleGetUsers).Methods("GET")
	r.HandleFunc("/validate", c.HandleValidateUser).Methods("POST")
	r.HandleFunc("/post/update", c.HandleEditArticle).Methods("PUT")
	r.HandleFunc("/post/delete", c.HandleDeleteArticle).Methods("DELETE")
	r.HandleFunc("/admin/create", c.HandleCreateAdmin).Methods("POST")

	fmt.Printf("Listen on port %s...\n", c.Server.Addr)
	err = c.Server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
