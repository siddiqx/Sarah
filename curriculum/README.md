# Curriculum Directory

This directory contains all curriculum definitions in structured formats.

## Structure

```
curriculum/
├── schema/           # JSON schemas for validation
├── phases/           # Phase definitions
├── days/             # Individual lesson content (JSON)
├── projects/         # Project definitions
└── assessments/      # Assessment definitions
```

## Content Format

All curriculum content is stored as JSON files following the schemas in `schema/`.

### Phases
- `phase_1_foundations.json`
- `phase_2_core_concepts.json`
- `phase_3_advanced_topics.json`
- `phase_4_capstone.json`

### Days/Lessons
- `day_01_hello_world.json`
- `day_02_variables.json`
- ...
- `day_60_final_project.json`

### Projects
- `project_01_cli_tool.json`
- `project_02_maze_solver.json`
- ...

### Assessments
- `assessment_01_control_flow.json`
- `assessment_02_phase1_diagnostic.json`
- ...

## Validation

Validate against schemas:
```bash
# Using Python
python -m jsonschema -i curriculum/days/day_15_recursion.json curriculum/schema/lesson.schema.json
```

## Importing to Database

Run seed SQL files:
```bash
psql -U sarah -d sarah -f database/seeds/01_phases.sql
psql -U sarah -d sarah -f database/seeds/02_lessons.sql
psql -U sarah -d sarah -f database/seeds/03_assessments.sql
psql -U sarah -d sarah -f database/seeds/04_questions.sql
psql -U sarah -d sarah -f database/seeds/05_projects.sql
```
