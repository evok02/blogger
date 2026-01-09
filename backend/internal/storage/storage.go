package storage

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func New(config *dbConfig) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", config.Path)
	if err != nil {
		return nil, fmt.Errorf("storage.New: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("storage.New: %w", err)
	}

	return db, nil
}

func Init() (*sql.DB, error) {
	config := &dbConfig{Path: "./internal/storage/data/sqlite.db"}
	db, err := New(config)

	if err != nil {
		return nil, fmt.Errorf("storage.Init: %w", err)
	}

	DB = db

	err = runMigrations()
	if err != nil {
		return nil, fmt.Errorf("storage.Init: %w", err)
	}

	return db, nil
}

func runMigrations() error {
	queryCreateUsers := `
	CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	is_admin NOT NULL DEFAULT false,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	`

	queryCreatePosts := `
	CREATE TABLE IF NOT EXISTS posts (
	id INTEGER PRIMARY KEY,
	title TEXT NOT NULL DEFAULT "Test Article",
	description TEXT NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	deleted_at DATETIME,
	is_deleted NOT NULL DEFAULT false
	);

	DELETE FROM posts
	WHERE id IN (0, 1);
	`

	_, err := DB.Exec(queryCreateUsers)
	if err != nil {
		return fmt.Errorf("runMigrations: %w", err)
	}

	_, err = DB.Exec(queryCreatePosts)
	if err != nil {
		return fmt.Errorf("runMigrations: %w", err)
	}

	return nil
}

func Close() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
