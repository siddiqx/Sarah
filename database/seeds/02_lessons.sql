-- Seed data for lessons (Phase 1)
INSERT INTO lessons (phase_id, day_number, title, description, estimated_minutes, difficulty, prerequisites, order_index, is_project, content_markdown) VALUES
-- Phase 1: Foundations
(1, 1, 'Hello World & Setup', 'Set up development environment and write your first program', 30, 'beginner', '{}', 1, false, '# Day 1: Hello World & Setup...'),
(1, 2, 'Variables & Data Types', 'Learn about variables, integers, floats, strings, and booleans', 45, 'beginner', '{1}', 2, false, '# Day 2: Variables & Data Types...'),
(1, 3, 'Control Flow: Conditionals', 'Make decisions with if, elif, and else statements', 45, 'beginner', '{2}', 3, false, '# Day 3: Control Flow - Conditionals...'),
(1, 4, 'Control Flow: Loops', 'Repeat code with while and for loops', 45, 'beginner', '{3}', 4, false, '# Day 4: Control Flow - Loops...'),
(1, 5, 'Functions Basics', 'Create reusable code with functions', 60, 'beginner', '{4}', 5, false, '# Day 5: Functions Basics...'),
(1, 6, 'Lists & Dictionaries', 'Work with collections of data', 60, 'beginner', '{5}', 6, false, '# Day 6: Lists & Dictionaries...'),
(1, 7, 'String Manipulation', 'Process and transform text data', 45, 'beginner', '{6}', 7, false, '# Day 7: String Manipulation...'),
(1, 8, 'File I/O Basics', 'Read from and write to files', 45, 'beginner', '{7}', 8, false, '# Day 8: File I/O Basics...'),
(1, 9, 'Error Handling', 'Handle exceptions gracefully with try/except', 45, 'beginner', '{8}', 9, false, '# Day 9: Error Handling...'),
(1, 10, 'Phase 1 Project: CLI Tool', 'Build a command-line task manager', 180, 'beginner', '{9}', 10, true, '# Phase 1 Capstone Project...'),

-- Phase 2: Core Concepts
(2, 11, 'Data Structures: Arrays', 'Implement dynamic arrays and understand memory layout', 60, 'intermediate', '{10}', 1, false, '# Day 11: Arrays...'),
(2, 12, 'Data Structures: Linked Lists', 'Build singly and doubly linked lists', 60, 'intermediate', '{11}', 2, false, '# Day 12: Linked Lists...'),
(2, 13, 'Data Structures: Stacks & Queues', 'LIFO and FIFO data structures', 60, 'intermediate', '{12}', 3, false, '# Day 13: Stacks & Queues...'),
(2, 14, 'Functions Deep Dive', 'Advanced function concepts: closures, decorators, generators', 60, 'intermediate', '{13}', 4, false, '# Day 14: Functions Deep Dive...'),
(2, 15, 'Introduction to Recursion', 'Recursive thinking and base cases', 45, 'intermediate', '{14}', 5, false, '# Day 15: Introduction to Recursion...'),
(2, 16, 'Recursive Algorithms', 'Tree traversal, backtracking, and divide & conquer', 60, 'intermediate', '{15}', 6, false, '# Day 16: Recursive Algorithms...'),
(2, 17, 'Divide and Conquer', 'Merge sort, quick sort, and binary search', 60, 'intermediate', '{16}', 7, false, '# Day 17: Divide and Conquer...'),
(2, 18, 'Dynamic Programming Basics', 'Memoization and tabulation techniques', 60, 'intermediate', '{17}', 8, false, '# Day 18: Dynamic Programming...'),
(2, 19, 'Memoization Patterns', 'Optimize recursive solutions', 45, 'intermediate', '{18}', 9, false, '# Day 19: Memoization...'),
(2, 20, 'Graph Data Structures', 'Adjacency lists, matrices, and graph representations', 60, 'intermediate', '{19}', 10, false, '# Day 20: Graph Data Structures...'),
(2, 21, 'Graph Algorithms: BFS/DFS', 'Traversal algorithms and applications', 60, 'intermediate', '{20}', 11, false, '# Day 21: BFS/DFS...'),
(2, 22, 'Graph Algorithms: Shortest Path', 'Dijkstra and A* algorithms', 60, 'advanced', '{21}', 12, false, '# Day 22: Shortest Path...'),
(2, 23, 'Trees & Binary Search Trees', 'Tree properties, BST operations', 60, 'intermediate', '{22}', 13, false, '# Day 23: Trees & BSTs...'),
(2, 24, 'Heaps & Priority Queues', 'Heap properties and heapq module', 45, 'intermediate', '{23}', 14, false, '# Day 24: Heaps...'),
(2, 25, 'Project: Maze Solver', 'Apply graph algorithms to solve mazes', 180, 'intermediate', '{24}', 15, true, '# Phase 2 Capstone: Maze Solver...');
