# Sarah - Deployment Documentation

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for frontend dev outside Docker)
- Python 3.11+ (for backend dev outside Docker)

### Quick Start
`ash
# Clone and navigate
cd sarah

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Services available at:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# Code Runner: http://localhost:8080
# API Docs: http://localhost:8000/docs
`

### Development with Hot Reload
`ash
# Frontend (separate terminal)
cd apps/web
npm install
npm run dev

# Backend (separate terminal)
cd apps/api
pip install -e .[dev]
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Code Runner (separate terminal)
cd services/code-runner
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8080
`

### Database Management
`ash
# Run migrations
cd apps/api
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m \"description\"

# Seed development data
psql -U sarah -d sarah -f database/seeds/01_dev_seed.sql

# Or via Docker
docker-compose exec postgres psql -U sarah -d sarah -f /docker-entrypoint-initdb.d/01_dev_seed.sql
`

### Environment Variables
Copy .env.example to .env and adjust:
`ash
cp .env.example .env
`

Key variables:
- DATABASE_URL - PostgreSQL connection
- SECRET_KEY - JWT signing (min 32 chars)
- CODE_RUNNER_URL - Code runner service URL

## Production Deployment

### Docker Compose (Single Server)
`ash
# Build images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
`

### docker-compose.prod.yml
`yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: 
      POSTGRES_PASSWORD: 
      POSTGRES_DB: 
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 1G

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql+asyncpg://:@postgres:5432/
      SECRET_KEY: 
      API_WORKERS: 4
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    deploy:
      replicas: 2

  code-runner:
    build:
      context: ./services/code-runner
      dockerfile: Dockerfile
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '1.0'
`

### Kubernetes (Future)
- Helm charts for each service
- HorizontalPodAutoscaler for API and Code Runner
- PostgreSQL operator for database
- Ingress for routing
- Cert-manager for TLS

## Environment Configuration

### Required Production Variables
`nv
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/db
SECRET_KEY=your-32-char-min-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

API_HOST=0.0.0.0
API_PORT=8000
API_WORKERS=4

WEB_URL=https://yourdomain.com
CORS_ORIGINS=https://yourdomain.com

CODE_RUNNER_URL=http://code-runner:8080
CODE_RUNNER_TIMEOUT=30

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=alerts@example.com
SMTP_PASSWORD=secret
EMAIL_FROM=noreply@yourdomain.com

REDIS_URL=redis://redis:6379/0

LOG_LEVEL=INFO
LOG_FORMAT=json
`

### Security Checklist
- [ ] Strong SECRET_KEY (32+ random chars)
- [ ] PostgreSQL password rotated
- [ ] HTTPS enforced (reverse proxy)
- [ ] CORS limited to production domain
- [ ] Code Runner isolated (separate network/VM)
- [ ] Database backups configured
- [ ] Log aggregation configured
- [ ] Rate limiting enabled
- [ ] Security headers via Nginx

## Database Operations

### Backup
`ash
# Logical backup
pg_dump -U sarah -h localhost sarah > backup_.sql

# Compressed
pg_dump -U sarah -h localhost sarah | gzip > backup_.sql.gz
`

### Restore
`ash
# From SQL
psql -U sarah -d sarah < backup_2024-01-15.sql

# From compressed
gunzip -c backup_2024-01-15.sql.gz | psql -U sarah -d sarah
`

### Migrations in Production
`ash
# Always backup first!
pg_dump ... > pre_migration_backup.sql

# Apply migrations
cd apps/api
alembic upgrade head

# Verify
alembic current
`

## Monitoring

### Health Checks
- GET /health - Backend
- GET /health - Code Runner
- PostgreSQL: pg_isready
- Frontend: Nginx status

### Logging
- Structured JSON logs (stdout)
- Levels: DEBUG, INFO, WARNING, ERROR
- Correlate with request IDs

### Metrics to Track
- API response times (p50, p95, p99)
- Error rates by endpoint
- Code execution queue depth
- Database connection pool usage
- Active users / sessions
- Lesson completion rates

## Scaling Guidelines

### Vertical Scaling
- Increase PostgreSQL memory (shared_buffers, work_mem)
- Increase API workers
- Increase Code Runner memory/CPU limits

### Horizontal Scaling
- Add API replicas behind load balancer
- Add Code Runner replicas (stateless)
- PostgreSQL read replicas for queries
- Redis for session storage
- CDN for frontend assets

## Troubleshooting

### Common Issues

**Database connection failed**
`ash
# Check PostgreSQL is running
docker-compose ps postgres
docker-compose logs postgres

# Check connection string
echo 
`

**Code execution timeout**
`ash
# Check Code Runner logs
docker-compose logs code-runner

# Increase timeout in .env
CODE_RUNNER_TIMEOUT=60
`

**Frontend not loading**
`ash
# Check build
docker-compose logs web

# Check API connectivity
curl http://localhost:8000/health
`

**Migration failed**
`ash
# Check current state
alembic current
alembic history

# Manual fix if needed, then
alembic stamp head
`

## Rollback Procedure
1. Revert Docker images: docker-compose pull previous tags
2. Restore database from backup
3. Run down migrations if needed: lembic downgrade -1
4. Restart services
