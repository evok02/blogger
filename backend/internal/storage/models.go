package storage

import (
	"database/sql"
	"time"
)

type Post struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	DeletedAt   time.Time `json:"-"`
	IsDeleted   bool      `json:"-"`
	Content     string    `json:"content"`
}

type NullablePost struct {
	ID          sql.NullInt64  `json:"id"`
	Title       sql.NullString `json:"title"`
	Description sql.NullString `json:"description"`
	CreatedAt   sql.NullTime   `json:"created_at"`
	DeletedAt   sql.NullTime   `json:"-"`
	IsDeleted   sql.NullBool   `json:"-"`
	Content     sql.NullString `json:"content"`
}

func (p *NullablePost) ToPost() Post {
	var post Post

	if p.DeletedAt.Valid {
		post.DeletedAt = p.DeletedAt.Time
	} else {
		var time time.Time
		post.DeletedAt = time
	}

	post.ID = p.ID.Int64
	post.Title = p.Title.String
	post.Description = p.Description.String
	post.CreatedAt = p.CreatedAt.Time
	post.IsDeleted = p.IsDeleted.Bool
	post.Content = p.Content.String

	return post
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	IsAdmin   bool      `json:"is_admin"`
	CreatedAt time.Time `json:"created_at"`
}
