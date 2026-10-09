# Sarah - Testing Documentation

## Test Strategy

### Test Pyramid
`
        ┌─────────────┐
        │   E2E       │  Few - Critical user journeys
        │  Playwright │
        ├─────────────┤
        │ Integration │  Some - API + DB, Service boundaries
        │  Pytest     │
        ├─────────────┤
        │   Unit      │  Many - Pure functions, algorithms
        │ Vitest/Pytest│
        └─────────────┘
`

## Frontend Testing (apps/web)

### Unit Tests - Vitest + React Testing Library
`ash
cd apps/web
npm test              # Run tests
npm run test:ui       # Visual test runner
npm run test:coverage # Coverage report
`

**What to test:**
- Utility functions (lib/utils.ts)
- Custom hooks (hooks/)
- Pure components (components/ui/)
- State logic (store/)

**Example:**
`	ypescript
// lib/utils.test.ts
import { cn, formatDate, formatRelativeTime } from './utils'

describe('utils', () => {
  test('cn merges classes correctly', () => {
    expect(cn('a', 'b')).toBe('a b')
    expect(cn('a', false && 'b')).toBe('a')
  })
  
  test('formatRelativeTime returns correct format', () => {
    const now = new Date()
    const hourAgo = new Date(now.getTime() - 3600000)
    expect(formatRelativeTime(hourAgo)).toBe('1h ago')
  })
})
`

### Component Tests
`	ypescript
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  test('renders with variant classes', () => {
    render(<Button variant='destructive'>Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
  
  test('handles click', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
`

### Integration Tests
- API client (lib/api.ts)
- Query hooks (hooks/useCurriculum.ts)
- Router integration

### E2E Tests - Playwright
`ash
cd apps/web
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Visual mode
`

**Critical Journeys:**
1. Open app → Dashboard loads
2. Navigate curriculum → Day → Topic → Lesson
3. Complete lesson block → Progress persists
4. Attempt exercise → Result recorded
5. Submit assessment → Score displayed
6. Revision generated → Appears in queue

**Example:**
`	ypescript
// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('dashboard shows welcome panel', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2:has-text(\"Welcome back\")')).toBeVisible()
  await expect(page.locator('button:has-text(\"Continue Learning\")')).toBeVisible()
})

test('curriculum navigation works', async ({ page }) => {
  await page.goto('/curriculum')
  await page.click('text=Phase 1')
  await expect(page.locator('text=Day 1')).toBeVisible()
})
`

## Backend Testing (apps/api)

### Unit Tests - Pytest
`ash
cd apps/api
pytest                    # Run all tests
pytest -v                 # Verbose
pytest --cov=app          # With coverage
pytest tests/test_specific.py::test_name  # Single test
`

**What to test:**
- Services (pp/services/)
- Schemas (pp/schemas/)
- Utilities
- Mastery calculations
- Revision scheduling
- Mistake classification

### Integration Tests
`python
# tests/test_curriculum_api.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_list_phases(async_client: AsyncClient):
    response = await async_client.get('/api/v1/curriculum/phases')
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 10
    assert data[0]['number'] == 1
`

### Database Tests
- Use test database (separate from dev)
- Fixtures in database/fixtures/
- Transaction rollback per test

### API Contract Tests
- Validate request/response against schemas
- Test error responses
- Test authentication/authorization

## Code Runner Testing

### Unit Tests
`python
# services/code-runner/test_executor.py
import pytest
from executor import CodeExecutor
from schemas import ExecutionRequest, Language

def test_python_execution():
    executor = CodeExecutor()
    request = ExecutionRequest(
        code='print(2+2)',
        language=Language.PYTHON
    )
    result = executor.execute(request)
    assert result.status == ExecutionStatus.SUCCESS
    assert '4' in result.stdout

def test_timeout():
    executor = CodeExecutor()
    request = ExecutionRequest(
        code='while True: pass',
        language=Language.PYTHON,
        timeout_seconds=1
    )
    result = executor.execute(request)
    assert result.status == ExecutionStatus.TIMEOUT
`

### Security Tests
`python
def test_no_filesystem_access():
    request = ExecutionRequest(
        code='open(\"/etc/passwd\").read()',
        language=Language.PYTHON
    )
    result = executor.execute(request)
    assert result.status == ExecutionStatus.ERROR
    # Should not leak file contents

def test_no_network_access():
    request = ExecutionRequest(
        code='import requests; requests.get(\"http://evil.com\")',
        language=Language.PYTHON
    )
    result = executor.execute(request)
    # Should fail or timeout
`

## Curriculum Validation Tests
`ash
python scripts/validate-curriculum.py
`

Tests:
- 250 days exist
- Continuous numbering
- Valid phase references
- Unique topic IDs
- Prerequisite resolution
- No cycles
- Lesson/assessment references
- Schema compliance

## Running All Tests

`ash
# Frontend
cd apps/web && npm test && npm run test:e2e

# Backend
cd apps/api && pytest

# Curriculum
python scripts/validate-curriculum.py

# Code Runner
cd services/code-runner && python -m pytest
`

## CI/CD Pipeline
`yaml
# .github/workflows/test.yml
on: [push, pull_request]
jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: cd apps/web && npm ci && npm test && npm run test:e2e
  
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: sarah
          POSTGRES_PASSWORD: test
          POSTGRES_DB: sarah_test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
      - run: cd apps/api && pip install -e .[dev] && pytest
  
  curriculum:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python scripts/validate-curriculum.py
`

## Coverage Targets
- Frontend unit: >80%
- Backend unit: >85%
- Integration: >70%
- E2E: Critical paths only

## Test Data Management
- Fixtures in database/fixtures/
- Factory functions for dynamic data
- No hardcoded IDs in tests
- Cleanup via transactions
