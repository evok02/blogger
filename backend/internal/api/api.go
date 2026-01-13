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

type ErrorResponse struct {
	Error string `json:"error"`
}

type RegistrationResponse struct {
	Success bool `json:"success"`
	ErrorResponse
}

type ValidationBody struct {
	IsValid bool `json:"is_valid"`
	IsAdmin bool `json:"is_admin"`
	ErrorResponse
}

type LoginForm struct {
	Email    string
	Password string
}

func writeError(err error, w http.ResponseWriter) {
	e := ErrorResponse{
		Error: err.Error(),
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(500)
	err = json.NewEncoder(w).Encode(e)
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

func (c *apiConfig) HandleGetPostById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("api point hit...")
	id := r.URL.Query().Get("id")
	intId, err := strconv.Atoi(id)
	if err != nil {
		writeError(err, w)
		return
	}
	post, err := storage.GetArticleById(intId)
	if err != nil {
		writeError(err, w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(post)
	if err != nil {
		writeError(err, w)
		return
	}
}

func (c *apiConfig) HandleGetArticles(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()
	var limit int
	limit, err := strconv.Atoi(queries.Get("num"))
	if err != nil {

	}

	posts, err := storage.GetPosts(limit)
	if err != nil {
		writeError(err, w)
	}

	err = json.NewEncoder(w).Encode(posts)
	if err != nil {
		writeError(err, w)
	}

	fmt.Printf("fetched successfully from %s\n", r.RemoteAddr)
}

func (c *apiConfig) HandleCreatePost(w http.ResponseWriter, r *http.Request) {
	var post storage.Post

	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		writeError(err, w)
	}

	err = storage.CreatePost(post)
	if err != nil {
		writeError(err, w)
	}
}

func (c *apiConfig) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	var u storage.User
	var res RegistrationResponse
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		res.Error = err.Error()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}

	err = storage.CreateUser(u)
	if err != nil {
		res.Error = err.Error()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}
}

func (c *apiConfig) HandleGetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := storage.GetUsers()
	if err != nil {
		writeError(err, w)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
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

func (c *apiConfig) HandleValidateUser(w http.ResponseWriter, r *http.Request) {
	var body LoginForm
	var res ValidationBody
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		writeError(err, w)
		return
	}

	isValid, err := storage.ValidateUser(body.Password, body.Email)
	if err != nil {
		res.Error = err.Error()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
		return
	}

	if isValid {
		u, err := storage.GetUserByEmail(body.Email)
		if err != nil {
			writeError(err, w)
		}
		res.IsValid = true
		res.IsAdmin = u.IsAdmin
	} else {
		res.Error = "invalid password"
	}

	fmt.Printf("%+v\n", res)

	err = json.NewEncoder(w).Encode(res)
}

func (c *apiConfig) HandleEditArticle(w http.ResponseWriter, r *http.Request) {
	var p storage.Post
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		writeError(err, w)
	}

	updatedPost, err := storage.EditArticle(p)
	if err != nil {
		writeError(err, w)
	}

	json.NewEncoder(w).Encode(updatedPost)
}

func (c *apiConfig) HandleDeleteArticle(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	intId, err := strconv.Atoi(id)
	if err != nil {
		writeError(fmt.Errorf("invalid id"), w)
	}

	err = storage.DeleteArticle(intId)
}

func (c *apiConfig) HandleCreateAdmin(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	intId, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println("invalid id format")
	}

	err = storage.CreateAdmin(intId)
	if err != nil {
		fmt.Println(err.Error())
	}
}
