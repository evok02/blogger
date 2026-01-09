package storage

import (
	//"context"
	//"time"
	"fmt"
)

func GetPosts(num int) ([]Post, error) {
	var q string
	if num == 0 {
		q = `
		SELECT * FROM posts
		WHERE is_deleted = false
		ORDER BY created_at DESC;
		`
	} else {
		q = fmt.Sprintf(`
		SELECT * FROM posts
		WHERE is_deleted = false
		ORDER BY created_at DESC
		LIMIT %v;
		`, num)

	}

	var res []Post
	//ctx, _ := context.WithTimeout(context.Background(),
	//		time.Second * 5)
	rows, err := DB.Query(q)
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
			&nullPost.DeletedAt,
			&nullPost.IsDeleted,
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

	fmt.Printf("Post was create successfuly: %s", p.Title)

	return nil
}
