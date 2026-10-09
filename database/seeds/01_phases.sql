-- Seed data for phases
INSERT INTO phases (id, name, description, order_index, icon, color, estimated_days, learning_goals, prerequisites) VALUES
(1, 'Phase 1: Foundations', 'Programming basics, variables, control flow, and functions', 1, 'BookOpen', '#0ea5e9', 10,
 '["Write and run Python programs", "Understand variables and data types", "Control program flow with conditionals and loops", "Create and use functions", "Work with basic data structures"]',
 '[]'),

(2, 'Phase 2: Core Concepts', 'Data structures, algorithms, recursion, and problem solving', 2, 'Target', '#22c55e', 15,
 '["Implement fundamental data structures", "Understand recursion and recursive algorithms", "Apply divide and conquer strategy", "Analyze time and space complexity", "Solve problems with dynamic programming"]',
 '[1]'),

(3, 'Phase 3: Advanced Topics', 'Object-oriented programming, system design, and specialized algorithms', 3, 'Flag', '#a855f7', 15,
 '["Design object-oriented systems", "Apply common design patterns", "Understand database fundamentals", "Build web APIs", "Introduction to system design"]',
 '[2]'),

(4, 'Phase 4: Capstone Projects', 'Real-world projects combining all learned concepts', 4, 'CheckCircle2', '#f59e0b', 20,
 '["Build complete applications from scratch", "Integrate multiple concepts", "Write production-quality code", "Deploy and document projects", "Prepare for technical interviews"]',
 '[3]');
