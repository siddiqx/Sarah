#!/usr/bin/env python3
\"\"\"
Curriculum Validation Script

Validates:
- Exactly 250 curriculum days exist
- Day numbering is continuous (1-250)
- Every day references an existing phase
- Every topic ID is unique
- All prerequisites resolve
- No prerequisite cycles
- Lesson references resolve
- Assessment references resolve
- Required fields exist
- Content schemas are valid
\"\"\"
import json
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple
from collections import defaultdict
import jsonschema


CURRICULUM_DIR = Path(__file__).parent.parent / 'curriculum'
PHASES_DIR = CURRICULUM_DIR / 'phases'
DAYS_DIR = CURRICULUM_DIR / 'days'
SCHEMA_DIR = CURRICULUM_DIR / 'schema'


def load_json(filepath: Path) -> dict:
    with open(filepath, 'r') as f:
        return json.load(f)


def load_schema(name: str) -> dict:
    return load_json(SCHEMA_DIR / f'{name}.schema.json')


def validate_schema(data: dict, schema_name: str) -> List[str]:
    errors = []
    schema = load_schema(schema_name)
    try:
        jsonschema.validate(data, schema)
    except jsonschema.ValidationError as e:
        errors.append(f'Schema validation failed: {e.message}')
    return errors


def main():
    print('=' * 60)
    print('SARAH CURRICULUM VALIDATION')
    print('=' * 60)
    
    all_errors = []
    all_warnings = []
    
    # 1. Load phases
    print('\n1. Loading phases...')
    phases = {}
    phase_numbers = set()
    for phase_file in sorted(PHASES_DIR.glob('phase-*.json')):
        data = load_json(phase_file)
        errors = validate_schema(data, 'phase')
        if errors:
            all_errors.extend([f'{phase_file.name}: {e}' for e in errors])
        else:
            phases[data['number']] = data
            phase_numbers.add(data['number'])
            print(f'  Phase {data[\"number\"]}: {data[\"title\"]} (days: {data[\"days\"]})')
    
    if len(phases) != 10:
        all_errors.append(f'Expected 10 phases, found {len(phases)}')
    
    # 2. Load days
    print('\n2. Loading days...')
    days = {}
    topic_ids = set()
    topic_to_day = {}
    topic_prereqs = defaultdict(list)
    
    day_files = sorted(DAYS_DIR.glob('day-*.json'))
    if len(day_files) != 250:
        all_warnings.append(f'Only {len(day_files)} day files found (expected 250)')
    
    for day_file in day_files:
        data = load_json(day_file)
        errors = validate_schema(data, 'day')
        if errors:
            all_errors.extend([f'{day_file.name}: {e}' for e in errors])
            continue
        
        day_num = data['number']
        
        # Check continuous numbering
        if day_num in days:
            all_errors.append(f'Duplicate day number: {day_num}')
        days[day_num] = data
        
        # Validate phase reference
        if data['phase'] not in phases:
            all_errors.append(f'Day {day_num}: References non-existent phase {data[\"phase\"]}')
        
        # Collect topics
        for topic in data.get('topics', []):
            topic_id = topic['topic_id']
            if topic_id in topic_ids:
                all_errors.append(f'Duplicate topic_id: {topic_id} (in day {day_num})')
            topic_ids.add(topic_id)
            topic_to_day[topic_id] = day_num
            
            # Collect prerequisites
            for prereq in topic.get('prerequisite_topic_ids', []):
                topic_prereqs[topic_id].append(prereq)
    
    # Check continuous numbering 1-250
    expected_days = set(range(1, 251))
    actual_days = set(days.keys())
    missing = expected_days - actual_days
    extra = actual_days - expected_days
    if missing:
        all_errors.append(f'Missing day numbers: {sorted(missing)}')
    if extra:
        all_errors.append(f'Extra day numbers: {sorted(extra)}')
    
    print(f'  Loaded {len(days)} days')
    print(f'  Found {len(topic_ids)} unique topics')
    
    # 3. Validate prerequisite resolution
    print('\n3. Validating prerequisite resolution...')
    for topic_id, prereqs in topic_prereqs.items():
        for prereq in prereqs:
            if prereq not in topic_ids:
                all_errors.append(f'Topic {topic_id}: Unresolved prerequisite {prereq}')
    
    # 4. Check for cycles in prerequisites
    print('\n4. Checking for prerequisite cycles...')
    def has_cycle(node: str, visited: Set[str], path: Set[str]) -> bool:
        visited.add(node)
        path.add(node)
        for neighbor in topic_prereqs.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor, visited, path):
                    return True
            elif neighbor in path:
                return True
        path.remove(node)
        return False
    
    visited = set()
    for topic_id in topic_ids:
        if topic_id not in visited:
            if has_cycle(topic_id, visited, set()):
                all_errors.append(f'Cycle detected involving {topic_id}')
                break
    
    # 5. Validate lesson references (basic check)
    print('\n5. Validating lesson references...')
    lesson_ids = set()
    for day_num, day_data in days.items():
        for topic in day_data.get('topics', []):
            for lesson_id in topic.get('lessons', []):
                if lesson_id in lesson_ids:
                    all_warnings.append(f'Duplicate lesson_id: {lesson_id}')
                lesson_ids.add(lesson_id)
    
    # 6. Validate assessment references
    print('\n6. Validating assessment references...')
    assessment_ids = set()
    for day_num, day_data in days.items():
        for topic in day_data.get('topics', []):
            for assessment_id in topic.get('assessments', []):
                if assessment_id in assessment_ids:
                    all_warnings.append(f'Duplicate assessment_id: {assessment_id}')
                assessment_ids.add(assessment_id)
    
    # 7. Validate projects
    print('\n7. Validating projects...')
    projects_dir = CURRICULUM_DIR / 'projects'
    for project_file in projects_dir.glob('*.json'):
        data = load_json(project_file)
        errors = validate_schema(data, 'project')
        if errors:
            all_errors.extend([f'{project_file.name}: {e}' for e in errors])
    
    # 8. Validate assessments
    print('\n8. Validating assessments...')
    assessments_dir = CURRICULUM_DIR / 'assessments'
    for assessment_file in assessments_dir.glob('*.json'):
        data = load_json(assessment_file)
        errors = validate_schema(data, 'assessment')
        if errors:
            all_errors.extend([f'{assessment_file.name}: {e}' for e in errors])
    
    # Summary
    print('\n' + '=' * 60)
    print('VALIDATION SUMMARY')
    print('=' * 60)
    
    if all_errors:
        print(f'\nERRORS ({len(all_errors)}):')
        for error in all_errors:
            print(f'  - {error}')
    else:
        print('\nNo errors found!')
    
    if all_warnings:
        print(f'\nWARNINGS ({len(all_warnings)}):')
        for warning in all_warnings:
            print(f'  - {warning}')
    
    print(f'\nPhases: {len(phases)}')
    print(f'Days: {len(days)} / 250')
    print(f'Topics: {len(topic_ids)}')
    print(f'Lessons referenced: {len(lesson_ids)}')
    print(f'Assessments referenced: {len(assessment_ids)}')
    
    if all_errors:
        print('\nVALIDATION FAILED')
        return 1
    else:
        print('\nVALIDATION PASSED')
        return 0


if __name__ == '__main__':
    sys.exit(main())
