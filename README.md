# Blogger

Full-stack blog platform with REST API.

## Stack

**Backend**: Go, gorilla/mux, SQLite

**Frontend**: React 19, Vite, TailwindCSS 4

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts?num=N` | List posts |
| GET | `/post?id=N` | Get single post |
| POST | `/post` | Create post |
| PUT | `/post/update` | Update post |
| DELETE | `/post/delete?id=N` | Delete post |
| POST | `/user` | Register user |
| GET | `/user?email=` | Get user by email |
| GET | `/users` | List all users |
| POST | `/validate` | Login |
| POST | `/admin/create?id=N` | Grant admin |
| POST | `/` | Health check |

## Usage

**Backend**:
```bash
cd backend && go run main.go
```
Requires `.env` with `SALT` variable.

**Frontend**:
```bash
cd frontend && npm install && npm run dev
```
