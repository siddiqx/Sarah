# Database Directory

## Structure

```
database/
├── seeds/        # SQL seed data for initial setup
├── fixtures/     # Test fixtures (JSON/factory data)
└── migrations/   # Managed by Alembic in apps/api/migrations/
```

## Seed Files

Run in order:
1. `01_phases.sql` - Learning phases
2. `02_lessons.sql` - Lessons for all phases
3. `03_assessments.sql` - Assessments
4. `04_questions.sql` - Assessment questions
5. `05_projects.sql` - Capstone projects

## Running Seeds

```bash
# Using Docker
docker-compose exec postgres psql -U sarah -d sarah -f /docker-entrypoint-initdb.d/01_phases.sql

# Local
psql -U sarah -d sarah -f database/seeds/01_phases.sql
```

## Fixtures

Test fixtures for pytest/factory_boy:
- `users.json` - Sample users
- `curriculum.json` - Sample curriculum data
- `progress.json` - Sample progress data

## Migrations

Managed by Alembic in `apps/api/migrations/`:
```bash
cd apps/api
alembic upgrade head
alembic revision --autogenerate -m "description"
```
