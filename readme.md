# Todo List (Clean Architecture)

A simple Todo app with a Node/Express backend and a Vite SPA frontend, structured using Clean Architecture for easy review and extension.

## Features
- JWT login
- View todos
- Add todo (admin only)
- SPA frontend with API proxy
- Docker + Nginx for production
- Dev stack with Vite HMR

## Project Structure
- `backend/` Node/Express API
- `frontend/` Vite SPA
- `nginx/` Reverse proxy configs
- `docs/ARCHITECTURE.md` Clean Architecture overview

## Requirements
- Node.js >= 18
- Docker + Docker Compose (optional but recommended)

## Quick Start (Production-like)
```
docker compose up -d --build
```
Open: `http://localhost`

## Dev Mode (Vite HMR + Nginx + Backend)
```
docker compose -f docker-compose.dev.yml up -d
```
Open:
- `http://localhost` (via nginx)
- `http://localhost:3001` (Vite direct)

## Local Dev Without Docker
Backend:
```
cd backend
npm install
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```
Open: `http://localhost:3001`

## Environment Variables
Backend (`backend/.env`):
```
PORT=3000
SECRET_KEY=mysecret
DB_USER=postgres
DB_PASS=password
DB_NAME=todo
DB_HOST=db
DB_PORT=5432
DATABASE_URL=
```

Frontend (`frontend/.env`):
```
VITE_API_BASE=/api
```

## Scripts
Backend:
- `npm run dev`
- `npm run start`

Frontend:
- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes
- For dev with Docker, API proxy is set through `VITE_PROXY_TARGET` in `docker-compose.dev.yml`.
- Backend is private in production (only nginx reaches it).

## CI/CD
See `.github/workflows/ci-cd.yml`.
