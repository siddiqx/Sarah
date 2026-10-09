# Sarah - API Documentation

## Base URL
- Development: http://localhost:8000
- API Prefix: /api/v1

## Authentication
- JWT Bearer tokens
- Header: Authorization: Bearer <access_token>
- Access token expiry: 30 minutes
- Refresh token expiry: 7 days

## Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login with email/password |
| POST | /auth/refresh | Refresh access token |
| POST | /auth/register | Register new user |
| GET | /auth/me | Get current user |

### Curriculum
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /curriculum/phases | List all phases |
| GET | /curriculum/phases/{phase_id} | Get phase details |
| GET | /curriculum/days | List days (optional phase_id filter) |
| GET | /curriculum/days/{day_number} | Get day details |
| GET | /curriculum/topics | List topics (optional phase_id, day_number filter) |
| GET | /curriculum/topics/{topic_id} | Get topic details |
| GET | /curriculum/lessons/{lesson_id} | Get lesson with blocks |

### Learning Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /progress/topics | Get user's topic progress |
| GET | /progress/topics/{topic_id} | Get specific topic progress |
| POST | /progress/topics/{topic_id} | Update topic progress |
| GET | /progress/lessons | Get user's lesson progress |
| POST | /progress/lessons/{lesson_id} | Mark lesson complete |

### Practice
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /practice/exercises | List exercises (topic_id filter) |
| GET | /practice/exercises/{exercise_id} | Get exercise |
| POST | /practice/exercises/{exercise_id}/attempt | Submit attempt |
| GET | /practice/attempts | Get user's attempts |

### Coding
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /coding/problems | List problems (topic_id, difficulty filter) |
| GET | /coding/problems/{problem_id} | Get problem with test cases |
| POST | /coding/problems/{problem_id}/execute | Execute code |
| POST | /coding/problems/{problem_id}/submit | Submit solution |
| GET | /coding/attempts | Get user's coding attempts |

### Assessments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /assessments | List assessments (type filter) |
| GET | /assessments/{assessment_id} | Get assessment with questions |
| POST | /assessments/{assessment_id}/start | Start assessment |
| POST | /assessments/{assessment_id}/submit | Submit assessment |
| GET | /assessments/attempts | Get user's attempts |

### Revision
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /revision/queue | Get revision queue |
| POST | /revision/items/{item_id}/complete | Complete revision item |
| GET | /revision/schedule | Get upcoming schedule |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /projects | List projects |
| GET | /projects/{project_id} | Get project details |
| GET | /projects/{project_id}/progress | Get user's project progress |
| POST | /projects/{project_id}/progress | Update project progress |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard/stats | Get dashboard statistics |
| GET | /dashboard/activity | Get recent activity |
| GET | /dashboard/tasks | Get today's tasks |
| GET | /dashboard/revision | Get due revisions |

## Request/Response Schemas

### Login Request
`json
{
  \"email\": \"user@example.com\",
  \"password\": \"string\"
}
`

### Login Response
`json
{
  \"access_token\": \"string\",
  \"refresh_token\": \"string\",
  \"token_type\": \"bearer\",
  \"user\": {
    \"id\": 1,
    \"email\": \"user@example.com\",
    \"username\": \"string\",
    \"full_name\": \"string\",
    \"current_day\": 1,
    \"current_phase\": 1
  }
}
`

### Curriculum Phase Response
`json
{
  \"id\": 1,
  \"number\": 1,
  \"title\": \"Python Foundations\",
  \"description\": \"...",
  \"order\": 1,
  \"created_at\": \"2024-01-01T00:00:00Z\",
  \"updated_at\": \"2024-01-01T00:00:00Z\"
}
`

### Curriculum Day Response
`json
{
  \"id\": 1,
  \"number\": 1,
  \"phase_id\": 1,
  \"title\": \"Introduction to Python\",
  \"summary\": \"...",
  \"learning_objectives\": [\"...\"],
  \"prerequisites\": [\"...\"],
  \"estimated_study_time_minutes\": 45,
  \"completion_criteria\": \"...\",
  \"topics\": [...]
}
`

### Lesson Block Types
- concept - Concept explanation
- worked_example - Worked example
- code_example - Code example
- prediction - Output prediction
- 	race - Step-by-step trace
- ill_code - Fill in the code
- ordering - Ordering exercise
- matching - Matching exercise
- comparison - Interactive comparison
- debugging - Debugging exercise
- simulation - Small simulation
- knowledge_check - Knowledge check
- practical_application - Practical application
- summary - Summary
- evision_checkpoint - Revision checkpoint

### Code Execution Request
`json
{
  \"code\": \"def solve(): ...\",
  \"language\": \"python\",
  \"test_cases\": [
    {\"input\": {\"arr\": [1,2,3]}, \"expected\": {\"output\": 6}}
  ],
  \"timeout_seconds\": 30,
  \"memory_limit_mb\": 256
}
`

### Code Execution Response
`json
{
  \"status\": \"success\",
  \"stdout\": \"...\",
  \"stderr\": \"\",
  \"test_results\": [
    {
      \"passed\": true,
      \"input\": {\"arr\": [1,2,3]},
      \"expected\": {\"output\": 6},
      \"actual\": {\"output\": 6},
      \"execution_time_ms\": 5
    }
  ],
  \"execution_time_ms\": 12,
  \"memory_used_mb\": 8
}
`

## Error Responses
`json
{
  \"detail\": \"Error message\"
}
`

HTTP Status Codes:
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 422 - Validation Error
- 500 - Internal Server Error
