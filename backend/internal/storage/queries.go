package storage

import (
	"context"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"os"
	"time"
)

func GetPosts(num int) ([]Post, error) {
	var q string
	if num == 0 {
		q = `
		SELECT id, 
		title, 
		description, 
		created_at, 
		content 
		FROM posts
		WHERE is_deleted = false
		ORDER BY created_at DESC;
		`
	} else {
		q = `
		SELECT id, 
		title, 
		description, 
		created_at, 
		content 
		FROM posts
		WHERE is_deleted = false
		ORDER BY created_at DESC
		LIMIT ?;
		`

	}

	var res []Post
	//ctx, _ := context.WithTimeout(context.Background(),
	//		time.Second * 5)
	rows, err := DB.Query(q, num)
	if err != nil {
		return nil, fmt.Errorf("getPosts: %w", err)
	}

	nullPost := NullablePost{}
	for rows.Next() {
		err := rows.Scan(
			&nullPost.ID,
			&nullPost.Title,
			&nullPost.Description,
			&nullPost.CreatedAt,
			&nullPost.Content,
		)

		if err != nil {
			return nil, fmt.Errorf("getPosts: %w", err)
		}

		res = append(res, nullPost.ToPost())
	}

	return res, nil
}

func CreatePost(p Post) error {
	q := `
	INSERT INTO posts (title, description, content)
	VALUES (?, ?, ?);
	`

	res, err := DB.Exec(q, p.Title, p.Description, p.Content)
	if err != nil {
		return fmt.Errorf("createPost: %w", err)
	}

	n, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("createPost: %w", err)
	}

	if n != 1 {
		return fmt.Errorf("raw was not created")
	}

	fmt.Printf("post was create successfuly: %s", p.Title)

	return nil
}

func CreateUser(u User) error {
	start := time.Now()
	password := []byte(u.Password + os.Getenv("SALT"))

	//ctx, cancel := context.WithTimeout(context.Background(), 3 * time.Second)
	encryptedPassword, err := bcrypt.GenerateFromPassword(password, 14)
	if err != nil {
		return fmt.Errorf("Create user: %w", err)
	}

	stringPassword := string(encryptedPassword)

	q := `
	INSERT INTO users_v (name, last_name, email, password)
	VALUES (?, ?, ?, ?)
	`

	res, err := DB.ExecContext(context.TODO(), q,
		u.Name,
		u.LastName,
		u.Email,
		stringPassword)

	if err != nil {
		return fmt.Errorf("createUser: %w", err)
	}

	n, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("createUser: %w", err)
	}

	if n == 0 {
		return fmt.Errorf("couldnt create the user entry")
	}

	fmt.Println(time.Since(start))
	return nil
}

func GetUserByEmail(email string) (User, error) {
	q := `
	SELECT * FROM users_v
	WHERE email = (?)
	`
	var u NullableUser

	row := DB.QueryRowContext(context.TODO(), q, email)

	err := row.Scan(
		&u.ID,
		&u.Name,
		&u.LastName,
		&u.Password,
		&u.Email,
		&u.IsAdmin,
		&u.CreatedAt,
	)

	if err != nil {
		return User{}, fmt.Errorf("getUserByEmail: %w", err)
	}

	return u.ToUser(), nil
}

func GetUsers() ([]User, error) {
	var res []User
	q := `
	SELECT * FROM users_v;
	`

	rows, err := DB.QueryContext(context.TODO(), q)
	if err != nil {
		return nil, fmt.Errorf("getUsers: %w", err)
	}

	var u NullableUser
	for rows.Next() {
		err := rows.Scan(
			&u.ID,
			&u.Name,
			&u.LastName,
			&u.Password,
			&u.Email,
			&u.IsAdmin,
			&u.CreatedAt,
		)
		if err != nil {
			return nil,
				fmt.Errorf("couldnt fetch the user with id:%v, err: %w", u.ID, err)
		}
		res = append(res, u.ToUser())
	}

	return res, nil
}

func ValidateUser(pwd string, email string) (bool, error) {
	u, err := GetUserByEmail(email)
	if err != nil {
		return false, fmt.Errorf("validateUser: %w", err)
	}

	encryptedPwd := []byte(u.Password)
	err = bcrypt.CompareHashAndPassword(encryptedPwd, []byte(pwd+os.Getenv("SALT")))
	if err != nil {
		return false, nil
	}

	return true, nil
}

func GetArticleById(id int) (Post, error) {
	q := `
	SELECT id, title, description, content, created_at FROM posts
	WHERE id = (?) AND is_deleted = false;
	`

	row := DB.QueryRowContext(context.TODO(), q, id)
	var nullPost NullablePost
	err := row.Scan(
		&nullPost.ID,
		&nullPost.Title,
		&nullPost.Description,
		&nullPost.Content,
		&nullPost.CreatedAt,
	)

	if err != nil {
		return Post{}, fmt.Errorf("getArticleById: %w", err)
	}

	return nullPost.ToPost(), nil
}
