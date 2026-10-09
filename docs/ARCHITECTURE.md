# Sarah - System Architecture

## Overview
Sarah is an interactive Data Engineering learning platform combining structured curriculum, interactive lessons, coding practice, assessments, and progress tracking.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component system
- **TanStack Query** for server state
- **React Router v6** for routing
- **Monaco Editor** for coding exercises
- **Lucide React** for icons
- **Zustand** for client state
- **Vitest** + React Testing Library for testing
- **Playwright** for E2E testing

### Backend
- **Python 3.11+**
- **FastAPI** for API framework
- **SQLAlchemy 2.0** with async support
- **asyncpg** for PostgreSQL driver
- **Alembic** for migrations
- **Pydantic v2** for validation
- **python-jose** for JWT auth
- **passlib** for password hashing
- **structlog** for structured logging
- **pytest** for testing

### Database
- **PostgreSQL 16** (production)
- **Redis** (optional, for caching/sessions)

### Services
- **Code Runner Service** - Isolated code execution (FastAPI + subprocess)

### Infrastructure
- **Docker Compose** for local development
- **Nginx** for frontend serving (production)

## Architecture Diagram

`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Nginx     │────▶│   Frontend  │
│  (React)    │     │  (Static)   │     │  (Vite)     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   FastAPI   │
                    │   Backend   │
                    └─────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │PostgreSQL│ │  Redis   │ │Code Runner│
        │          │ │ (cache)  │ │ Service  │
        └──────────┘ └──────────┘ └──────────┘
`

## Data Flow

### Learning Flow
1. User navigates curriculum → Frontend fetches phases/days/topics
2. User opens lesson → Frontend fetches lesson blocks
3. User completes block → Progress persisted via API
4. User attempts exercise → Answer validated → Result stored
5. User submits code → Code Runner executes → Results returned
6. Assessment completed → Score calculated → Mastery updated
7. Revision scheduled → Added to queue based on evidence

### Code Execution Flow
1. Frontend sends code + test cases to Backend /api/v1/coding/execute
2. Backend forwards to Code Runner Service
3. Code Runner writes code to temp file
4. Executes in subprocess with timeout/memory limits
5. Returns stdout, stderr, test results
6. Backend persists attempt
7. Frontend displays results

## Security

### Authentication
- JWT access tokens (30 min expiry)
- Refresh tokens (7 day expiry)
- bcrypt password hashing
- HttpOnly cookies for tokens (production)

### Code Execution Isolation
- Subprocess isolation
- Timeout limits (default 30s)
- Memory limits (default 256MB)
- No network access
- Restricted filesystem (temp directory only)
- Non-root user execution

### API Security
- CORS configured for frontend origin
- Rate limiting (to be implemented)
- Input validation via Pydantic
- SQL injection prevention via SQLAlchemy ORM
- XSS prevention via React's auto-escaping

## Scalability Considerations

### Current (Single Developer)
- All services on single host via Docker Compose
- SQLite not used - PostgreSQL for production parity
- Code Runner runs on same host

### Future Horizontal Scaling
- Backend: Multiple workers behind load balancer
- Code Runner: Separate pool of execution workers
- Database: Read replicas for queries
- Redis: Session storage and caching
- Frontend: CDN for static assets

## Monitoring & Observability
- Structured JSON logging (structlog)
- Health endpoints on all services
- PostgreSQL health checks
- Request/response logging

## Development Workflow
1. docker-compose up starts all services
2. Frontend at http://localhost:5173
3. Backend at http://localhost:8000
4. Code Runner at http://localhost:8080
5. Hot reload for both frontend and backend
