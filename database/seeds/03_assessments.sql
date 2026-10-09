-- Seed data for assessments
INSERT INTO assessments (id, phase_id, title, description, type, time_limit_minutes, passing_score, max_attempts) VALUES
(1, 1, 'Control Flow Assessment', 'Test your understanding of conditionals, loops, and control flow statements', 'quiz', 30, 70, 3),
(2, 1, 'Phase 1 Diagnostic', 'Comprehensive assessment of Phase 1 concepts', 'exam', 60, 75, 2),
(3, 2, 'Data Structures Quiz', 'Arrays, linked lists, stacks, and queues', 'quiz', 30, 70, 3),
(4, 2, 'Recursion & Algorithms Assessment', 'Recursive thinking, divide and conquer, dynamic programming', 'exam', 45, 70, 3),
(5, 2, 'Graph Algorithms Quiz', 'BFS, DFS, shortest path, and graph representations', 'quiz', 30, 70, 3),
(6, 3, 'OOP & Design Patterns', 'Classes, inheritance, composition, and common patterns', 'quiz', 30, 70, 3),
(7, 3, 'System Design Basics', 'Scalability, databases, caching, and API design', 'exam', 60, 75, 2),
(8, 4, 'Capstone Project Review', 'Code review and presentation of final project', 'project', 120, 80, 1);
