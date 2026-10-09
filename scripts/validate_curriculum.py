#!/usr/bin/env python3
"""
Curriculum validation script.
Validates all curriculum JSON files for consistency and correctness.
"""

import json
import os
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any


class ValidationError(Exception):
    pass


def load_json_files(directory: Path, pattern: str = "*.json") -> dict[str, Any]:
    """Load all JSON files from a directory."""
    result = {}
    for file_path in directory.glob(pattern):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                result[file_path.stem] = data
        except json.JSONDecodeError as e:
            raise ValidationError(f"Invalid JSON in {file_path}: {e}")
        except Exception as e:
            raise ValidationError(f"Error reading {file_path}: {e}")
    return result


def validate_required_fields(data: dict, required: list[str], context: str) -> list[str]:
    """Validate that required fields exist in data."""
    errors = []
    for field in required:
        if field not in data:
            errors.append(f"{context}: missing required field '{field}'")
    return errors


def validate_phases(phases: dict[str, Any]) -> list[str]:
    """Validate phase files."""
    errors = []
    phase_numbers = set()
    required_fields = ["number", "title", "description", "days"]

    for name, phase in phases.items():
        errors.extend(validate_required_fields(phase, required_fields, f"Phase {name}"))

        if "number" in phase:
            num = phase["number"]
            if num in phase_numbers:
                errors.append(f"Phase {name}: duplicate phase number {num}")
            phase_numbers.add(num)

        if "days" in phase:
            for day in phase["days"]:
                if not isinstance(day, int) or day <= 0:
                    errors.append(f"Phase {name}: invalid day number {day}")

    return errors


def validate_days(days: dict[str, Any], phase_numbers: set[int]) -> tuple[list[str], set[int]]:
    """Validate day files."""
    errors = []
    day_numbers = set()
    required_fields = ["number", "phase", "title", "summary", "learning_objectives", "prerequisites", "topics", "estimated_study_time_minutes", "completion_criteria"]

    for name, day in days.items():
        errors.extend(validate_required_fields(day, required_fields, f"Day {name}"))

        if "number" in day:
            num = day["number"]
            if num in day_numbers:
                errors.append(f"Day {name}: duplicate day number {num}")
            day_numbers.add(num)

        if "phase" in day:
            if day["phase"] not in phase_numbers:
                errors.append(f"Day {name}: references non-existent phase {day['phase']}")

        if "topics" in day:
            for i, topic in enumerate(day["topics"]):
                topic_required = ["topic_id", "title", "description", "difficulty", "learning_objectives", "prerequisite_topic_ids", "lessons", "exercises", "assessments"]
                for field in topic_required:
                    if field not in topic:
                        errors.append(f"Day {name}, topic {i}: missing required field '{field}'")

    # Check continuous numbering
    if day_numbers:
        max_day = max(day_numbers)
        expected = set(range(1, max_day + 1))
        missing = expected - day_numbers
        if missing:
            errors.append(f"Day numbering not continuous: missing days {sorted(missing)}")

    return errors, day_numbers


def validate_topics(topics: dict[str, Any], day_numbers: set[int]) -> tuple[list[str], set[str]]:
    """Validate topic files and return errors and all topic_ids."""
    errors = []
    all_topic_ids = set()
    required_fields = ["id", "title", "description", "difficulty", "learning_objectives", "prerequisite_topic_ids", "related_skills", "lesson_refs", "practice_refs", "assessment_refs", "mastery_criteria", "revision_criteria"]

    for name, topic in topics.items():
        errors.extend(validate_required_fields(topic, required_fields, f"Topic {name}"))

        if "id" in topic:
            tid = topic["id"]
            if tid in all_topic_ids:
                errors.append(f"Topic {name}: duplicate topic_id '{tid}'")
            all_topic_ids.add(tid)

    return errors, all_topic_ids


def validate_prerequisite_cycles(topics: dict[str, Any]) -> list[str]:
    """Detect cycles in prerequisite graph using DFS."""
    errors = []

    # Build adjacency list
    graph = {}
    for name, topic in topics.items():
        tid = topic.get("id")
        if tid:
            prereqs = topic.get("prerequisite_topic_ids", [])
            graph[tid] = prereqs

    def has_cycle(node: str, visited: set, rec_stack: set) -> bool:
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if neighbor not in graph:
                continue
            if neighbor not in visited:
                if has_cycle(neighbor, visited, rec_stack):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    visited = set()
    for node in graph:
        if node not in visited:
            if has_cycle(node, visited, set()):
                errors.append(f"Cycle detected in prerequisite graph involving topic '{node}'")

    return errors


def validate_prerequisite_references(topics: dict[str, Any], all_topic_ids: set[str]) -> list[str]:
    """Validate that all prerequisite topic_ids exist."""
    errors = []

    for name, topic in topics.items():
        tid = topic.get("id", name)
        for prereq in topic.get("prerequisite_topic_ids", []):
            if prereq not in all_topic_ids:
                errors.append(f"Topic '{tid}': references non-existent prerequisite topic '{prereq}'")

    return errors


def validate_lesson_references(topics: dict[str, Any], lessons_dir: Path) -> list[str]:
    """Validate that lesson_refs point to existing lesson files."""
    errors = []

    # Load lesson files
    lesson_files = set()
    for file_path in lessons_dir.glob("*.json"):
        lesson_files.add(file_path.stem)

    for name, topic in topics.items():
        tid = topic.get("id", name)
        for lesson_ref in topic.get("lesson_refs", []):
            if lesson_ref not in lesson_files:
                errors.append(f"Topic '{tid}': references non-existent lesson '{lesson_ref}'")

    return errors


def validate_assessment_references(topics: dict[str, Any], assessments_dir: Path) -> list[str]:
    """Validate that assessment_refs point to existing assessment files."""
    errors = []

    # Load assessment files
    assessment_files = set()
    for file_path in assessments_dir.glob("*.json"):
        assessment_files.add(file_path.stem)

    for name, topic in topics.items():
        tid = topic.get("id", name)
        for assess_ref in topic.get("assessment_refs", []):
            if assess_ref not in assessment_files:
                errors.append(f"Topic '{tid}': references non-existent assessment '{assess_ref}'")

    return errors


def validate_day_topic_consistency(days: dict[str, Any], all_topic_ids: set[str]) -> list[str]:
    """Validate that topics referenced in days exist in topic files."""
    errors = []

    for name, day in days.items():
        day_num = day.get("number", name)
        for topic in day.get("topics", []):
            topic_id = topic.get("topic_id")
            if topic_id and topic_id not in all_topic_ids:
                errors.append(f"Day {day_num}: references non-existent topic '{topic_id}'")

    return errors


def main():
    base_path = Path(__file__).parent.parent / "curriculum"

    phases_dir = base_path / "phases"
    days_dir = base_path / "days"
    topics_dir = base_path / "topics"
    lessons_dir = base_path / "lessons"
    assessments_dir = base_path / "assessments"

    all_errors = []

    print("Loading curriculum files...")

    try:
        phases = load_json_files(phases_dir)
        days = load_json_files(days_dir)
        topics = load_json_files(topics_dir)
    except ValidationError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    print(f"Loaded {len(phases)} phases, {len(days)} days, {len(topics)} topics")

    # Validate phases
    print("Validating phases...")
    phase_errors = validate_phases(phases)
    all_errors.extend(phase_errors)

    phase_numbers = {p["number"] for p in phases.values() if "number" in p}

    # Validate days
    print("Validating days...")
    day_errors, day_numbers = validate_days(days, phase_numbers)
    all_errors.extend(day_errors)

    # Validate topics
    print("Validating topics...")
    topic_errors, all_topic_ids = validate_topics(topics, day_numbers)
    all_errors.extend(topic_errors)

    # Validate prerequisite references
    print("Validating prerequisite references...")
    prereq_errors = validate_prerequisite_references(topics, all_topic_ids)
    all_errors.extend(prereq_errors)

    # Validate prerequisite cycles
    print("Checking for prerequisite cycles...")
    cycle_errors = validate_prerequisite_cycles(topics)
    all_errors.extend(cycle_errors)

    # Validate lesson references
    print("Validating lesson references...")
    lesson_errors = validate_lesson_references(topics, lessons_dir)
    all_errors.extend(lesson_errors)

    # Validate assessment references
    print("Validating assessment references...")
    assess_errors = validate_assessment_references(topics, assessments_dir)
    all_errors.extend(assess_errors)

    # Validate day-topic consistency
    print("Validating day-topic consistency...")
    consistency_errors = validate_day_topic_consistency(days, all_topic_ids)
    all_errors.extend(consistency_errors)

    # Summary
    if all_errors:
        print(f"\nVALIDATION FAILED: {len(all_errors)} error(s) found\n")
        for error in all_errors:
            print(f"  - {error}")
        sys.exit(1)
    else:
        print("\nVALIDATION PASSED: All curriculum files are valid")
        sys.exit(0)


if __name__ == "__main__":
    main()

