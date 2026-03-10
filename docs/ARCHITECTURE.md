# Architecture

This project follows a Clean Architecture layout for both backend (Node/Express) and frontend (Vite SPA). The goal is to keep business rules stable, isolate frameworks, and make each layer easy to test and review.

## Principles
- Dependency direction always points inward (outer layers depend on inner layers).
- Use cases contain business rules and are framework-agnostic.
- Controllers/adapters translate transport details into use case calls.
- Repositories are interfaces at the boundary, implemented by infrastructure.

## Backend Layers

### 1) Interfaces (HTTP)
- Purpose: Handle HTTP request/response and map them to use cases.
- Location: `backend/src/interfaces/http/`
- Examples: `authController.js`, `todoController.js`, `authMiddleware.js`

### 2) Use Cases
- Purpose: Business rules, validation, and decision logic.
- Location: `backend/src/usecases/`
- Examples: `auth/login.js`, `todos/listTodos.js`, `todos/addTodo.js`

### 3) Infrastructure
- Purpose: Database access and external integrations.
- Location: `backend/src/infrastructure/`
- Examples: `repositories/*.js`, `db/pool.js`

### 4) Configuration
- Purpose: Centralized runtime configuration (env).
- Location: `backend/src/config/env.js`

### Composition Root
- Purpose: Wire dependencies together.
- Location: `backend/src/app.js` and `backend/src/index.js`

## Frontend Layers

### 1) UI
- Purpose: DOM bindings and presentation state.
- Location: `frontend/src/ui/`
- Example: `state.js`

### 2) Use Cases
- Purpose: App rules (login, list todos, add todo).
- Location: `frontend/src/usecases/`
- Examples: `login.js`, `listTodos.js`, `addTodo.js`

### 3) Data
- Purpose: API access and repositories.
- Location: `frontend/src/data/`
- Examples: `apiClient.js`, `authRepository.js`, `todoRepository.js`

### 4) Core
- Purpose: Global config and constants.
- Location: `frontend/src/core/config.js`

## Dependency Flow

Backend:
`interfaces -> usecases -> infrastructure`

Frontend:
`ui -> usecases -> data -> core`

## How to Extend

Backend:
- Add a new route: create controller in `interfaces/http/`
- Add rules: create use case in `usecases/`
- Add DB access: create repository in `infrastructure/repositories/`
- Wire in `src/app.js`

Frontend:
- Add a new feature: create use case in `usecases/`
- Add data access: create repository in `data/`
- Render state updates in `ui/`

## Notes
- Keep HTTP and DB details outside the use case layer.
- Avoid referencing Express or database code inside use cases.
- Use cases should be pure and testable with dependency injection.
