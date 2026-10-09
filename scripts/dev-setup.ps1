# Sarah Development Environment Setup Script (Windows PowerShell)

Continue = 'Stop'

Write-Host '========================================' -ForegroundColor Cyan
Write-Host 'Sarah Development Environment Setup' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan

# Check prerequisites
function Check-Command {
    param(, )
    if (-not (Get-Command  -ErrorAction SilentlyContinue)) {
        Write-Host \"ERROR:  is not installed. Please install  first.\" -ForegroundColor Red
        exit 1
    }
}

Write-Host 'Checking prerequisites...'
Check-Command 'Docker' 'docker'
Check-Command 'Docker Compose' 'docker-compose'
Check-Command 'Node.js' 'node'
Check-Command 'npm' 'npm'
Check-Command 'Python' 'python'

Write-Host 'All prerequisites found.' -ForegroundColor Green

# Create .env from example if not exists
if (-not (Test-Path '.env')) {
    Write-Host 'Creating .env from .env.example...'
    Copy-Item '.env.example' '.env'
    Write-Host 'Please edit .env with your configuration.' -ForegroundColor Yellow
} else {
    Write-Host '.env already exists.' -ForegroundColor Green
}

# Install frontend dependencies
Write-Host ''
Write-Host 'Installing frontend dependencies...'
Set-Location 'apps/web'
npm ci
Set-Location '../..'

# Install backend dependencies
Write-Host ''
Write-Host 'Installing backend dependencies...'
Set-Location 'apps/api'
pip install -e .[dev]
Set-Location '../..'

# Install code runner dependencies
Write-Host ''
Write-Host 'Installing code runner dependencies...'
Set-Location 'services/code-runner'
pip install -r requirements.txt
Set-Location '../..'

# Start Docker services
Write-Host ''
Write-Host 'Starting Docker services (PostgreSQL)...'
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
Write-Host 'Waiting for PostgreSQL to be ready...'
Start-Sleep -Seconds 5

# Run database migrations
Write-Host ''
Write-Host 'Running database migrations...'
Set-Location 'apps/api'
alembic upgrade head
Set-Location '../..'

# Seed database
Write-Host ''
Write-Host 'Seeding database...'
python scripts/seed-database.py

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host 'Setup complete!' -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ''
Write-Host 'To start development servers:'
Write-Host '  Frontend:  cd apps/web; npm run dev'
Write-Host '  Backend:   cd apps/api; uvicorn app.main:app --reload'
Write-Host '  Code Runner: cd services/code-runner; uvicorn main:app --reload --port 8080'
Write-Host ''
Write-Host 'Or use Docker Compose for all services:'
Write-Host '  docker-compose up -d'
Write-Host ''
Write-Host 'Access points:'
Write-Host '  Frontend:  http://localhost:5173'
Write-Host '  Backend:   http://localhost:8000'
Write-Host '  API Docs:  http://localhost:8000/docs'
Write-Host '  Code Runner: http://localhost:8080'
