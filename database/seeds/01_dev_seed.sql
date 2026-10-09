-- Seed data for development
-- Insert development user
INSERT INTO users (email, username, hashed_password, full_name, is_active, current_day, current_phase)
VALUES (
    'dev@sarah.local',
    'developer',
    '\\\/LewdBPj/RK.PZvO.S',  -- password: 'devpassword'
    'Developer User',
    true,
    1,
    1
) ON CONFLICT (email) DO NOTHING;

-- Insert curriculum phases
INSERT INTO curriculum_phases (number, title, description, \"order\") VALUES
(1, 'Python Foundations', 'Core Python syntax, variables, data types, conditions, and functions.', 1),
(2, 'Loops and Problem Solving', 'for, while, range, accumulators, searching, filtering, and number problems.', 2),
(3, 'Python Data Structures', 'Lists, tuples, dictionaries, sets, nested structures, and transformations.', 3),
(4, 'Practical Python', 'Functions in depth, modules, file handling, exceptions, testing, and Git.', 4),
(5, 'SQL and Relational Databases', 'Tables, keys, filtering, joins, subqueries, CTEs, window functions, PostgreSQL.', 5),
(6, 'Data Processing', 'CSV, JSON, Excel, Pandas, data cleaning, validation, Parquet, data quality.', 6),
(7, 'APIs and Ingestion', 'HTTP, REST APIs, authentication, pagination, rate limits, retries, incremental ingestion.', 7),
(8, 'Data Engineering Foundations', 'ETL/ELT, pipeline design, data modeling, warehouses, lakes, contracts, orchestration.', 8),
(9, 'Production Tools', 'Linux, Docker, Airflow, Spark fundamentals, cloud platforms, environment config.', 9),
(10, 'Production Projects and Capstone', 'End-to-end ingestion, transformation, validation, scheduling, testing, deployment.', 10)
ON CONFLICT (number) DO NOTHING;

-- Insert sample curriculum days (first 5 days)
INSERT INTO curriculum_days (number, phase_id, title, summary, learning_objectives, prerequisites, estimated_study_time_minutes, completion_criteria) VALUES
(1, 1, 'Introduction to Python', 'Learn what Python is, how to run it, and write your first program.',
 '["Understand what Python is and why it is used in Data Engineering", "Run Python code in the REPL and from files", "Write and execute a Hello World program"]',
 '[]', 45, 'Complete both lessons and pass the intro quiz.'),
(2, 1, 'Variables and Data Types', 'Understand variables, basic types, and type conversion.',
 '["Create and assign variables", "Identify basic data types: int, float, str, bool", "Convert between types"]',
 '["python-intro"]', 60, 'Complete all three lessons and pass quiz with 70%+'),
(3, 1, 'Strings and String Operations', 'Work with text data using string methods.',
 '["Create and manipulate strings", "Use common string methods", "Format strings with f-strings"]',
 '["variables", "data-types"]', 60, 'Complete lessons and string exercises'),
(4, 1, 'Conditions and Boolean Logic', 'Control program flow with if/elif/else.',
 '["Write conditional statements", "Combine conditions with and/or/not", "Understand truthy/falsy values"]',
 '["variables", "data-types"]', 60, 'Complete lessons and condition exercises'),
(5, 1, 'Functions Basics', 'Create reusable code with functions.',
 '["Define functions with def", "Use parameters and return values", "Understand scope basics"]',
 '["variables", "conditions"]', 60, 'Complete lessons and function exercises')
ON CONFLICT (number) DO NOTHING;

-- Insert sample topics
INSERT INTO curriculum_topics (topic_id, day_number, title, description, difficulty, learning_objectives, prerequisite_topic_ids, related_skills, mastery_criteria, revision_criteria) VALUES
('python-intro', 1, 'What is Python?', 'Overview of Python and its role in Data Engineering.', 'beginner',
 '["Explain what Python is", "Identify Python use cases in DE"]', '[]', '["programming-fundamentals"]',
 'Can explain Python role in DE', 'Recall key Python features'),
('running-python', 1, 'Running Python Code', 'REPL vs scripts, running files.', 'beginner',
 '["Use the Python REPL", "Run a .py file"]', '["python-intro"]', '["development-environment"]',
 'Can run Python file and use REPL', 'Start REPL and run script'),
('variables', 2, 'Variables', 'Naming, assignment, and reassignment.', 'beginner',
 '["Create valid variable names", "Reassign variables"]', '["running-python"]', '["programming-fundamentals"]',
 'Can create and use variables correctly', 'Identify valid/invalid variable names'),
('data-types', 2, 'Basic Data Types', 'int, float, str, bool and type().', 'beginner',
 '["Identify types with type()", "Understand type differences"]', '["variables"]', '["programming-fundamentals"]',
 'Can identify and use basic types', 'Distinguish between types'),
('type-conversion', 2, 'Type Conversion', 'Explicit and implicit conversion.', 'beginner',
 '["Convert between types", "Handle conversion errors"]', '["data-types"]', '["programming-fundamentals"]',
 'Can convert types safely', 'Predict conversion results')
ON CONFLICT (topic_id) DO NOTHING;

-- Insert sample lessons
INSERT INTO curriculum_lessons (lesson_id, topic_id, title, description) VALUES
('python-intro-lesson', 'python-intro', 'Introduction to Python', 'Learn what Python is and why it matters for Data Engineering.'),
('running-python-lesson', 'running-python', 'Running Python Code', 'Learn to use the REPL and run Python files.'),
('variables-lesson', 'variables', 'Variables', 'Understand variable naming, assignment, and reassignment.'),
('data-types-lesson', 'data-types', 'Basic Data Types', 'Learn about int, float, str, bool and the type() function.'),
('type-conversion-lesson', 'type-conversion', 'Type Conversion', 'Master explicit and implicit type conversion in Python.')
ON CONFLICT (lesson_id) DO NOTHING;

-- Insert lesson blocks for python-intro-lesson
INSERT INTO lesson_blocks (lesson_id, block_type, content, \"order\") VALUES
(1, 'concept', '{\"explanation\": \"Python is a high-level, interpreted programming language known for its readability and versatility. In Data Engineering, Python is the primary language for data processing, pipeline orchestration, and automation.\"}', 0),
(1, 'code_example', '{\"code\": \"print(\\\"Hello, Data Engineering!\\\")\\n# This is a comment\\nx = 42\\nprint(f\\\"The answer is {x}\\\")\"}', 1),
(1, 'knowledge_check', '{\"question\": \"What makes Python popular for Data Engineering?\", \"options\": [\"Speed\", \"Readability and ecosystem\", \"Low memory usage\", \"Compiled language\"], \"correct\": 1}', 2);

-- Insert lesson blocks for running-python-lesson
INSERT INTO lesson_blocks (lesson_id, block_type, content, \"order\") VALUES
(2, 'concept', '{\"explanation\": \"You can run Python in two main ways: the interactive REPL (Read-Eval-Print Loop) for quick experiments, and .py script files for reusable programs.\"}', 0),
(2, 'code_example', '{\"code\": \"# REPL example\\n>>> 2 + 2\\n4\\n>>> name = \\\"Sarah\\\"\\n>>> print(f\\\"Hello, {name}!\\\")\\nHello, Sarah!\"}', 1),
(2, 'fill_code', '{\"prompt\": \"Create a file called hello.py that prints \\\"Hello, World!\\\"\", \"starter\": \"# hello.py\\nprint(\\\"_____\\\")\", \"solution\": \"print(\\\"Hello, World!\\\")\"}', 2);

-- Insert sample exercises
INSERT INTO exercises (exercise_id, topic_id, title, description, difficulty, question_type, question_data, correct_answer, hints, explanation, mistake_categories) VALUES
('var-ex-1', 'variables', 'Create a Variable', 'Create a variable called \"name\" with your name as a string.', 1, 'fill_code',
 '{\"prompt\": \"Create a variable name with your name\", \"starter\": \"name = _____\"}',
 '{\"code\": \"name = \\\"Your Name\\\"\"}', ['Use quotes for strings'], 'Variables store values using the = operator.',
 '["syntax-error", "wrong-type"]'),
('type-ex-1', 'data-types', 'Identify the Type', 'What type is the value 3.14?', 1, 'multiple_choice',
 '{\"prompt\": \"What is type(3.14)?\", \"options\": [\"int\", \"float\", \"str\", \"bool\"]}',
 '{\"answer\": 1}', ['Decimal points indicate float'], '3.14 has a decimal point, making it a float.',
 '["wrong-type", "confusion"]'),
('conv-ex-1', 'type-conversion', 'Convert String to Int', 'Convert the string \"42\" to an integer.', 1, 'fill_code',
 '{\"prompt\": \"Convert string to integer\", \"starter\": \"s = \\\"42\\\"\\nn = _____\"}',
 '{\"code\": \"int(s)\"}', ['Use int() function'], 'int() converts strings to integers.',
 '["wrong-function", "syntax-error"]')
ON CONFLICT (exercise_id) DO NOTHING;
