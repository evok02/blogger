package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/evok02/blogger/internal/storage"
	"net/http"
	"strconv"
)

type apiConfig struct {
	Server  http.Server
	Storage *sql.DB
}

func sendError(err error, w http.ResponseWriter) {
	w.WriteHeader(500)
	w.Write([]byte(err.Error()))
}

func NewApiConfig() (*apiConfig, error) {
	db, err := storage.Init()
	if err != nil {
		return nil, err
	}

	return &apiConfig{
		Server: http.Server{
			Addr: ":8080",
		},
		Storage: db,
	}, nil
}

func (c *apiConfig) HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Working fine: HP 100%"))
}

func (c *apiConfig) HandleGetArticles(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()
	var limit int
	limit, err := strconv.Atoi(queries.Get("num"))
	if err != nil {

	}

	posts, err := storage.GetPosts(limit)
	if err != nil {
		sendError(err, w)
	}

	err = json.NewEncoder(w).Encode(posts)
	if err != nil {
		sendError(err, w)
	}

	fmt.Printf("fetched successfully from %s\n", r.RemoteAddr)
}

func (c *apiConfig) HandleCreatePost(w http.ResponseWriter, r *http.Request) {
	var post storage.Post

	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		sendError(err, w)
	}

	err = storage.CreatePost(post)
	if err != nil {
		sendError(err, w)
	}
}

func (c *apiConfig) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	var u storage.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		w.Write([]byte(err.Error()))
	}

	err = storage.CreateUser(u)
	if err != nil {
		w.Write([]byte(err.Error()))
	}
}

func (c *apiConfig) HandleGetUser(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	mail := params.Get("email")

	if mail == "" {
		w.Write([]byte("invalid format~"))
	}

	user, err := storage.GetUserByEmail(mail)
	if err != nil {
		w.Write([]byte(err.Error()))
	}

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		w.Write([]byte(err.Error()))
	}
}
