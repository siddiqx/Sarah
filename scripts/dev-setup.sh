#!/bin/bash
# Sarah Development Environment Setup Script (Linux/macOS)

set -e

echo '========================================'
echo 'Sarah Development Environment Setup'
echo '========================================'

# Check prerequisites
check_command() {
    if ! command -v  &> /dev/null; then
        echo \"ERROR:  is not installed. Please install  first.\"
        exit 1
    fi
}

echo 'Checking prerequisites...'
check_command docker
check_command docker-compose
check_command node
check_command npm
check_command python3

echo 'All prerequisites found.'

# Create .env from example if not exists
if [ ! -f .env ]; then
    echo 'Creating .env from .env.example...'
    cp .env.example .env
    echo 'Please edit .env with your configuration.'
else
    echo '.env already exists.'
fi

# Install frontend dependencies
echo ''
echo 'Installing frontend dependencies...'
cd apps/web
npm ci
cd ../..

# Install backend dependencies
echo ''
echo 'Installing backend dependencies...'
cd apps/api
pip install -e .[dev]
cd ../..

# Install code runner dependencies
echo ''
echo 'Installing code runner dependencies...'
cd services/code-runner
pip install -r requirements.txt
cd ../..

# Start Docker services
echo ''
echo 'Starting Docker services (PostgreSQL)...'
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo 'Waiting for PostgreSQL to be ready...'
sleep 5

# Run database migrations
echo ''
echo 'Running database migrations...'
cd apps/api
alembic upgrade head
cd ../..

# Seed database
echo ''
echo 'Seeding database...'
python scripts/seed-database.py

echo ''
echo '========================================'
echo 'Setup complete!'
echo '========================================'
echo ''
echo 'To start development servers:'
echo '  Frontend:  cd apps/web && npm run dev'
echo '  Backend:   cd apps/api && uvicorn app.main:app --reload'
echo '  Code Runner: cd services/code-runner && uvicorn main:app --reload --port 8080'
echo ''
echo 'Or use Docker Compose for all services:'
echo '  docker-compose up -d'
echo ''
echo 'Access points:'
echo '  Frontend:  http://localhost:5173'
echo '  Backend:   http://localhost:8000'
echo '  API Docs:  http://localhost:8000/docs'
echo '  Code Runner: http://localhost:8080'
