# Sarah

An interactive Data Engineering learning platform with a structured 250-day curriculum.

## Overview

Sarah teaches Data Engineering through:
- Structured learning path (250 days across 10 stages)
- Interactive lessons with typed content blocks
- Progressive practice engine (8 difficulty levels)
- Coding lab with Monaco Editor and isolated execution
- Assessment engine with multiple question types
- Mastery tracking with evidence-based progression
- Spaced revision scheduling
- Real Data Engineering projects and labs

## Tech Stack

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- TanStack Query for server state
- React Router for navigation
- Monaco Editor for coding
- Vitest + React Testing Library + Playwright

**Backend:**
- Python 3.11+ + FastAPI
- SQLAlchemy 2.0 + Alembic migrations
- Pydantic v2 for validation
- PostgreSQL 16

**Services:**
- Code Runner (isolated Python execution)

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- PostgreSQL 16 (or Docker)

### Using Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Local Development

**Backend:**
```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp ../.env.example .env
# Edit .env with your settings
alembic upgrade head
uvicorn app.main:app --reload
```

**Code Runner:**
```bash
cd services/code-runner
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8001
```

**Frontend:**
```bash
cd apps/web
npm install
npm run dev
```

## Project Structure

```
sarah/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # FastAPI backend
├── services/
│   └── code-runner/  # Isolated code execution
├── curriculum/       # Curriculum content (schema, phases, days, projects, assessments)
├── database/         # Seeds and fixtures
├── docs/             # Documentation
├── scripts/          # Utility scripts
├── docker-compose.yml
├── .env.example
└── README.md
```

## Development Commands

**Backend:**
```bash
cd apps/api
ruff check .           # Lint
ruff format .          # Format
mypy .                 # Type check
pytest                 # Run tests
alembic revision --autogenerate -m "message"  # Create migration
alembic upgrade head   # Apply migrations
```

**Frontend:**
```bash
cd apps/web
npm run lint           # Lint (oxlint)
npm run typecheck      # Type check (tsc)
npm run test           # Unit tests (vitest)
npm run test:e2e       # E2E tests (playwright)
npm run build          # Production build
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Database](docs/DATABASE.md)
- [API](docs/API.md)
- [Curriculum](docs/CURRICULUM.md)
- [Testing](docs/TESTING.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Implementation Status](docs/IMPLEMENTATION_STATUS.md)

## License

MIT
