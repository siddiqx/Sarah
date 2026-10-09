# Sarah - Curriculum Documentation

## Structure Overview

The curriculum is the source of truth for all learning content in Sarah. It follows a strict hierarchy:

`
Curriculum (250 days)
  └── Phases (10)
        └── Days (25 per phase)
              └── Topics (1-5 per day)
                    ├── Lessons (1-3 per topic)
                    │     └── Blocks (5-15 per lesson)
                    ├── Exercises (3-8 per topic)
                    ├── Assessments (per topic/phase)
                    └── Revision criteria
`

## Content Files

### Schema Validation
All content validated against JSON schemas in curriculum/schema/:
- phase.schema.json
- day.schema.json
- lesson_block.schema.json
- xercise.schema.json
- ssessment.schema.json
- project.schema.json

### File Organization
`
curriculum/
├── schema/           # JSON schemas
├── phases/           # phase-a.json through phase-j.json
├── days/             # day-001.json through day-250.json
├── projects/         # project definitions
└── assessments/      # assessment definitions
`

## Phase Structure

Each phase defines:
- 
umber: 1-10
- 	itle: Phase name
- description: Overview
- days: Array of day numbers (continuous)

## Day Structure

Each day defines:
- 
umber: 1-250 (continuous, unique)
- phase: 1-10
- 	itle: Day title
- summary: Brief description
- learning_objectives: Array of objectives
- prerequisites: Topic IDs required before this day
- 	opics: Array of topic objects
- stimated_study_time_minutes: 30-120
- completion_criteria: How to know day is done

## Topic Structure

Each topic defines:
- 	opic_id: Stable unique identifier (e.g., ariables, dict-methods)
- 	itle: Display title
- description: Detailed description
- difficulty: beginner/intermediate/advanced
- learning_objectives: Array of objectives
- prerequisite_topic_ids: Other topic_ids required first
- elated_skills: Skill tags for knowledge map
- lessons: Lesson IDs
- xercises: Exercise IDs
- ssessments: Assessment IDs
- mastery_criteria: What demonstrates mastery
- evision_criteria: What triggers revision

## Lesson Blocks

Each lesson contains ordered blocks. Block types:

| Type | Purpose | Content Fields |
|------|---------|----------------|
| concept | Explain concept | explanation, code? |
| worked_example | Show solved problem | scenario, code, explanation |
| code_example | Show code pattern | code, annotations? |
| prediction | Predict output | code, question, options, correct, explanation |
| trace | Step through execution | code, steps[] |
| fill_code | Complete code | prompt, starter, solution, hint |
| ordering | Order steps | prompt, items[], correct_order[] |
| matching | Match pairs | prompt, pairs[] |
| comparison | Compare approaches | code_a, code_b, question |
| debugging | Fix broken code | buggy_code, expected, hint |
| simulation | Interactive model | config, initial_state |
| knowledge_check | Quick quiz | question, options, correct |
| practical_application | Real-world task | scenario, requirements, hints |
| summary | Recap key points | points[] |
| revision_checkpoint | Link to revision | topic_id, revision_type |

## Validation Rules

The validation script (scripts/validate-curriculum.py) checks:

1. **Exactly 250 days** exist (day-001.json through day-250.json)
2. **Continuous numbering** - no gaps in day numbers
3. **Valid phase references** - each day's phase exists
4. **Unique topic IDs** - no duplicates across all days
5. **Prerequisite resolution** - all prerequisite_topic_ids exist
6. **No cycles** - prerequisite graph is acyclic
5. **Lesson references** - all lesson IDs exist
6. **Assessment references** - all assessment IDs exist
7. **Required fields** - all mandatory fields present
8. **Schema compliance** - all files match their schemas

Run validation:
`ash
python scripts/validate-curriculum.py
`

## Content Authoring Workflow

1. **Plan** - Define phase/day structure
2. **Schema** - Ensure schemas support needed block types
3. **Author** - Create day/topic/lesson files
4. **Validate** - Run validation script
5. **Test** - Load in application, verify rendering
6. **Review** - Check pedagogy, accuracy, progression
7. **Publish** - Add to curriculum, update seeds

## Extending Content

### Adding a Block Type
1. Add to lesson_block.schema.json enum
2. Create React component in components/lesson-blocks/
3. Register in lesson renderer
4. Update validation if needed

### Adding a Question Type
1. Add to exercise/assessment schemas
2. Create renderer component
3. Add evaluation logic
4. Update mistake classification

## Versioning

Curriculum content is versioned with the application. Breaking changes to schemas require:
1. Schema version bump
2. Migration script for existing content
3. Application code updates
4. Validation script updates
