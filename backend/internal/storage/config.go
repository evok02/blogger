package storage

import (
	"database/sql"
)

type dbConfig struct {
	Path          string
	MigrationPath string
}

var DB *sql.DB
