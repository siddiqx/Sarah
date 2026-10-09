SARAH
Complete Product Implementation Specification
Project: Sarah
Product category: Interactive Data Engineering learning platform
Starting condition: Empty project folder
Objective: Build a complete, functional, tested, and documented application.
PART I — YOUR MISSION
You are the lead software architect, full-stack engineer, database engineer, UI implementer, curriculum engineer, testing engineer, and technical documentation author responsible for building Sarah.
Your assignment is to build the actual application from an empty project folder through to a verified, working product.
You must implement the application, run it, test it, identify defects, fix them, and verify the results.
Do not stop after producing an architecture document.
Do not stop after creating a frontend prototype.
Do not stop after implementing the dashboard.
Do not generate a collection of disconnected pages and call the project complete.
Your responsibility is to deliver one coherent application in which the interface, backend, database, curriculum, learning activities, assessments, and progress tracking work together.
You may use reasonable engineering judgment when implementation details are unspecified. Document important decisions rather than repeatedly asking questions about choices that can be made safely.
Do not invent external credentials, pretend an external service is configured, or claim that functionality has been tested when it has not.
1.1 Operating environment
You are working inside Antigravity with access to development tools.
The project directory is initially empty.
Before writing code:
1. Inspect the current working directory.
2. Confirm the project root.
3. Inspect available runtimes and package managers.
4. Determine which commands can run in the environment.
5. Create the project structure.
6. Establish a working development environment.
Use the provided Sarah dashboard reference image as the visual specification. If the image is available in the conversation but not in the project directory, use the attached image as your reference and do not invent a different design.
Do not assume that a database, backend, frontend, environment file, or Git repository already exists.
Create what is required.
PART II — PRODUCT VISION
2. What Sarah is
Sarah is a self-contained learning environment designed to teach Data Engineering through a structured 250-day curriculum.
The application must combine:
- Structured learning.
- Interactive explanations.
- Programming practice.
- Code execution.
- Quizzes.
- Practical assessments.
- Mistake analysis.
- Topic mastery.
- Spaced revision.
- Data Engineering laboratories.
- Projects.
- Curriculum progress.
- Learning analytics.
Sarah must replace a fragmented learning process involving external videos, manually reconstructed explanations, separate coding exercises, and manual progress updates.
The intended learning workflow is:
Learn → Understand → Predict → Write → Practice → Apply → Assess → Revise → Master
The application should help a learner understand not only what a programming concept does, but also when to use it, why it works, how to solve problems with it, and how it connects to real Data Engineering work.
2.1 Product boundaries
Sarah and Doctrine are separate products with separate responsibilities.
Sarah owns:
- Teaching.
- Curriculum.
- Exercises.
- Coding.
- Assessment.
- Mastery.
- Revision.
- Projects.
- Learning analytics.
Doctrine owns:
- Overall life management.
- Career goals.
- General progress tracking.
- Habit tracking.
- Planning.
- Broader personal development.
Sarah must work independently of Doctrine.
Implement a clean integration boundary so summarized learning progress can be shared with Doctrine in a future integration.
Do not make Doctrine integration a prerequisite for completing Sarah.
PART III — IMPLEMENTATION RULES
3. Work in verified stages
This project is too large to implement reliably as one uncontrolled generation.
Follow the stages in this document in order.
At the beginning of each stage:
1. Inspect the current implementation.
2. Read the relevant project documentation.
3. Identify the stage's required outcomes.
4. Identify dependencies.
5. Implement the smallest complete set of changes.
6. Run the relevant tests.
7. Fix failures.
8. Update documentation.
9. Record the completed work.
10. Proceed to the next stage.
Do not repeatedly rewrite functioning components because a different implementation seems more attractive.
Do not make broad architectural changes without a concrete reason.
Mandatory checkpoint
After every major stage, maintain a development record in:
docs/IMPLEMENTATION_STATUS.md
Include:
- Completed features.
- Changed files.
- Database changes.
- Commands executed.
- Tests executed.
- Test results.
- Known defects.
- Remaining tasks.
- Exact next implementation step.
Also maintain:
docs/ARCHITECTURE.md
docs/DATABASE.md
docs/API.md
docs/CURRICULUM.md
docs/TESTING.md
docs/DEPLOYMENT.md
Create these documents as the relevant systems are implemented. Do not fill them with generic descriptions that do not match the actual code.
If the context window is interrupted or a session ends, use these documents and the actual repository state to resume. Never assume that a feature was completed merely because an earlier plan described it.
3.1 Definition of implementation
A feature is implemented only when:
- Its necessary code exists.
- Its dependencies are connected.
- Its expected behavior is defined.
- Its primary interaction works.
- Its data persists when persistence is required.
- Its failure states are handled.
- Its relevant tests pass.
A button, page, mock response, or static progress indicator is not sufficient evidence of a working feature.
PART IV — TECHNICAL ARCHITECTURE
4. Recommended stack
Use a modern, maintainable stack.
Frontend
- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui or a similarly accessible component system.
- Lucide icons.
- TanStack Query for server state.
- Monaco Editor for coding activities.
Use a lightweight state-management solution only where necessary.
Do not add libraries without a concrete requirement.
Backend
- Python.
- FastAPI.
- Pydantic.
- SQLAlchemy.
- Alembic.
Database
Use PostgreSQL as the primary production database.
Provide a documented local development setup.
Docker Compose may be used to run PostgreSQL and other required services locally.
If Docker is unavailable, document an alternative setup rather than silently replacing the intended architecture.
Testing
Frontend:
- Vitest.
- React Testing Library.
- Playwright for end-to-end testing.
Backend:
- Pytest.
- FastAPI test client.
- Database integration tests.
Use appropriate type checking, linting, and formatting tools.
Architecture principle
Keep the application modular without prematurely introducing distributed infrastructure.
Do not introduce Kubernetes, multiple independently deployed microservices, or a complex event bus unless a demonstrated requirement justifies them.
The initial product should be deployable and maintainable by one developer.
PART V — PROJECT STRUCTURE
5. Create the project from scratch
Use a clean monorepo structure similar to:
sarah/
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── curriculum/
│   │   │   │   ├── lessons/
│   │   │   │   ├── practice/
│   │   │   │   ├── coding/
│   │   │   │   ├── assessments/
│   │   │   │   ├── revision/
│   │   │   │   ├── projects/
│   │   │   │   ├── knowledge-map/
│   │   │   │   └── settings/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── routes/
│   │   │   ├── styles/
│   │   │   └── types/
│   │   └── tests/
│   │
│   └── api/
│       ├── app/
│       │   ├── api/
│       │   ├── core/
│       │   ├── models/
│       │   ├── schemas/
│       │   ├── repositories/
│       │   ├── services/
│       │   ├── curriculum/
│       │   ├── learning/
│       │   ├── assessments/
│       │   ├── revision/
│       │   └── main.py
│       ├── migrations/
│       └── tests/
│
├── services/
│   └── code-runner/
│
├── curriculum/
│   ├── schema/
│   ├── phases/
│   ├── days/
│   ├── projects/
│   └── assessments/
│
├── database/
│   ├── seeds/
│   └── fixtures/
│
├── docs/
│
├── scripts/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md

Adapt the structure where necessary, but preserve the separation between frontend, backend, curriculum content, execution services, and documentation.
Do not create empty folders merely to imitate this tree.
Every created module should have a defined responsibility.
PART VI — VISUAL DESIGN SPECIFICATION
6. The supplied image is the primary design reference
The dashboard image supplied with this project is the authoritative visual reference.
Reproduce its overall composition and visual character as closely as practical. Do not redesign it into a generic SaaS dashboard.
The target is a recognizable adaptation of the reference, not a pixel-identical copy of its unrelated educational content.
Preserve:
- Three-column desktop layout.
- White left navigation panel.
- Light-gray central workspace.
- White right sidebar.
- Rounded outer application shell.
- Restrained shadows.
- Soft borders.
- Muted blue accents.
- Compact information cards.
- Horizontal learning-card row.
- Tabular activity section.
- Profile and calendar on the right.
- Generous whitespace.
- Consistent alignment.
Do not replace this arrangement with a centered content column, an entirely different navigation structure, or a large collection of oversized dashboard cards.
6.1 Desktop layout
Use the following approximate proportions as an initial guide:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  LEFT NAVIGATION   CENTRAL WORKSPACE       RIGHT SIDEBAR    │
│  Approximately     Approximately           Approximately    │
│  18%               57%                    25%               │
│                                                             │
│  Sarah             Search                 Profile           │
│                                                             │
│  Dashboard         Welcome panel          Calendar          │
│  Curriculum        Learning cards         Today's tasks     │
│  Practice          Activity table         Revision queue    │
│  Coding Lab                                                  │
│  Assessments                                                  │
│  Projects                                                     │
│  Knowledge Map                                                │
│  Revision                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

These are starting proportions, not mandatory percentages at every resolution.
The reference's visual balance matters more than strict arithmetic.
The complete application shell should fit naturally within the desktop viewport, with internal scrolling where necessary.
Avoid unnecessary page-level horizontal scrolling.
6.2 Left sidebar
At the top, show the Sarah wordmark and a simple logo.
Navigation items:
1. Dashboard.
2. Curriculum.
3. Practice.
4. Coding Lab.
5. Assessments.
6. Projects.
7. Knowledge Map.
8. Revision.
Each item must have:
- A small icon.
- A readable label.
- An accessible interaction target.
- A visible active state.
Keep inactive navigation muted.
Include a compact help or system-status section near the bottom.
6.3 Central workspace
Top bar
Include:
- Search.
- Current date.
- Relevant compact actions.
Welcome panel
Display a white panel inspired by the reference's prominent introductory banner.
Example:
Welcome back.
Continue building your Data Engineering skills.
Primary action:
Continue Learning
The action must open the next appropriate learning activity using real curriculum and progress data.
Include a restrained illustration or learning visualization only if it improves the design.
Learning cards
Show three compact horizontal cards:
- Current curriculum phase.
- Continue learning.
- Revision due.
Each card must display meaningful information and have a working interaction.
Recent activity
Create a compact table with columns such as:
- Topic.
- Activity type.
- Status.
- Last activity.
- Action.
Possible activities include lessons, coding exercises, quizzes, and revision.
Use real persisted records.
For a new learner, show a deliberate empty state rather than invented activity.
6.4 Right sidebar
Learner profile
Show:
- Avatar or initials.
- Learner name.
- Current learning phase.
- Profile/settings action.
Calendar
Include:
- Month navigation.
- Current date.
- Study activity indicators.
- Assessment dates.
- Project milestones.
- Revision sessions.
Selecting a date must display the relevant activities.
Do not generate fake historical study sessions.
Today's tasks
Display actionable items derived from:
- Current learning position.
- Incomplete work.
- Upcoming assessments.
- Revision requirements.
Each item must open the relevant activity.
Do not create decorative reminders that cannot be completed.
6.5 Design tokens
Define reusable tokens for:
- Backgrounds.
- Panels.
- Primary and secondary text.
- Borders.
- Accent colors.
- Spacing.
- Typography.
- Shadows.
- Radius.
- Focus states.
- Status indicators.
Use restrained color.
Avoid:
- Neon green.
- Heavy gradients.
- Dark hacker aesthetics.
- Excessive glass effects.
- Cartoonish illustrations.
- Confetti.
- XP spam.
- Badges everywhere.
- Excessive animations.
- Unnecessary decorative components.
The interface should look like a polished developer-oriented product, not a generic children's learning application.
6.6 Responsive behavior
Desktop is the primary reference.
Implement responsive behavior after establishing the desktop layout.
On tablets:
- Reduce sidebar width.
- Reflow cards.
- Allow the right panel to collapse.
On mobile:
- Use a navigation drawer or suitable compact navigation.
- Stack the main content.
- Make calendar and tasks accessible.
- Preserve all core functionality.
- Prevent horizontal overflow.
Do not force the entire desktop layout into a narrow viewport.
PART VII — APPLICATION ROUTES
7. Implement real routes
Provide functional routes for:
/
    Dashboard

/curriculum
    Curriculum overview

/curriculum/:day
    Day overview

/topics/:topicId
    Topic details

/lessons/:lessonId
    Interactive lesson

/practice
    Practice workspace

/coding
    Coding lab

/coding/:problemId
    Coding problem

/assessments
    Assessment overview

/assessments/:assessmentId
    Assessment

/projects
    Projects overview

/projects/:projectId
    Project workspace

/knowledge-map
    Topic dependency map

/revision
    Revision queue

/history
    Learning history

/settings
    Application settings

You may organize the route structure differently if necessary, but every major feature must have a real destination.
Use sensible loading, empty, and error states.
Routes must remain usable after refreshing the browser.
PART VIII — CURRICULUM ENGINE
8. The curriculum is the source of truth
Sarah's curriculum covers 250 days.
Represent it as structured, version-controlled content.
Do not hard-code all daily lessons into React components.
Do not store the curriculum as one giant JSON file.
Use modular files grouped by phase or day, with validation.
The curriculum engine must load and validate the content independently of the interface.
Required hierarchy
Curriculum
    ↓
Phases
    ↓
Days
    ↓
Topics
    ↓
Lessons
    ↓
Learning activities
    ↓
Exercises and assessments

Each day must define
- Day number.
- Phase.
- Title.
- Summary.
- Learning objectives.
- Prerequisites.
- Topics.
- Estimated study time.
- Lessons.
- Interactive activities.
- Practice exercises.
- Quiz.
- Assessment where appropriate.
- Revision requirements.
- Project work where appropriate.
- Completion criteria.
Each topic must define
- Stable ID.
- Title.
- Description.
- Difficulty.
- Learning objectives.
- Prerequisite topic IDs.
- Related skills.
- Lesson references.
- Practice references.
- Assessment references.
- Mastery criteria.
- Revision criteria.
Use stable IDs rather than relying on display titles.
Validation
Create a script that validates:
- Exactly 250 curriculum days exist.
- Day numbering is continuous.
- Every day references an existing phase.
- Every topic ID is unique.
- All prerequisites resolve.
- No prerequisite cycle exists.
- Lesson references resolve.
- Assessment references resolve.
- Required fields exist.
- Content schemas are valid.
The validation script must run automatically in the development workflow and test suite.
PART IX — THE 250-DAY LEARNING PATH
9. Curriculum design
The curriculum must progressively build the skills required for practical Data Engineering.
Do not treat 250 days as 250 unrelated daily lessons.
The days must form a coherent progression with explicit dependencies.
Use the following subject areas as the curriculum's initial framework. Assign exact day ranges after evaluating prerequisite depth and workload.
Stage A — Python foundations
Cover:
- Syntax.
- Variables.
- Data types.
- Type conversion.
- Input and output.
- Operators.
- Expressions.
- Strings.
- Conditions.
- Functions.
- Problem decomposition.
Stage B — Loops and problem solving
Cover:
- for.
- while.
- range().
- Counting.
- Accumulators.
- Product accumulators.
- Searching.
- Filtering.
- Maximum and minimum.
- Nested loops.
- Loop boundaries.
- Manual tracing.
- Number problems.
- Factorial.
- Digit operations.
- Prime numbers.
- Fibonacci.
- GCD and LCM.
Stage C — Python data structures
Cover:
- Lists.
- Tuples.
- Dictionaries.
- Sets.
- Nested structures.
- Iteration.
- Transformation.
- Searching.
- Aggregation.
- Data structure selection.
- Common errors.
Stage D — Practical Python
Cover:
- Functions in depth.
- Modules.
- File handling.
- Exceptions.
- Debugging.
- Testing.
- Virtual environments.
- Package management.
- Type hints.
- Basic software design.
- Git.
- Command-line usage.
Stage E — SQL and relational databases
Cover:
- Relational concepts.
- Tables.
- Primary and foreign keys.
- Data types.
- Filtering.
- Sorting.
- Aggregations.
- Grouping.
- Joins.
- Subqueries.
- Common table expressions.
- Window functions.
- Constraints.
- Indexes.
- Transactions.
- Query plans.
- PostgreSQL.
Stage F — Data processing
Cover:
- CSV.
- JSON.
- Excel where appropriate.
- Pandas.
- Data cleaning.
- Missing values.
- Duplicate detection.
- Type conversion.
- Validation.
- Aggregation.
- Transformation.
- Parquet.
- Data quality.
Stage G — APIs and ingestion
Cover:
- HTTP.
- REST APIs.
- Requests.
- JSON responses.
- Authentication concepts.
- Pagination.
- Rate limits.
- Retries.
- Timeouts.
- Error handling.
- Incremental ingestion.
- Idempotency.
Stage H — Data engineering foundations
Cover:
- ETL and ELT.
- Batch processing.
- Pipeline design.
- Data modeling.
- Dimensional modeling.
- Facts and dimensions.
- Data warehouses.
- Data lakes.
- Data contracts.
- Logging.
- Data quality.
- Orchestration.
Stage I — Production tools
Cover:
- Linux.
- Docker.
- Environment configuration.
- Airflow.
- Scheduling.
- Dependencies.
- Retries.
- Backfills.
- Spark fundamentals.
- Distributed processing.
- Performance considerations.
- Cloud data platform fundamentals.
Stage J — Production projects and capstone
Integrate previously learned skills.
Include:
- End-to-end ingestion.
- Transformation.
- Data validation.
- Database loading.
- Scheduling.
- Logging.
- Error handling.
- Testing.
- Documentation.
- Deployment considerations.
- Capstone evaluation.
Important constraint
Do not attempt to teach every technology at full professional depth in 250 days.
Prioritize strong foundations and progressively practical competence.
The final curriculum must be internally consistent and realistic for a learner studying approximately one to two hours per day.
PART X — TEACHING ENGINE
10. Lessons must be structured and interactive
Do not build lessons as giant Markdown articles.
Create a reusable lesson engine based on typed content blocks.
Required block types:
1. Concept explanation.
2. Worked example.
3. Code example.
4. Output prediction.
5. Step-by-step trace.
6. Fill-in-the-code.
7. Ordering exercise.
8. Matching exercise.
9. Interactive comparison.
10. Debugging exercise.
11. Small simulation.
12. Knowledge check.
13. Practical application.
14. Summary.
15. Revision checkpoint.
Each block must be rendered by a reusable frontend component.
Unknown block types should fail validation rather than silently disappear.
10.1 Standard lesson structure
Use this progression where appropriate:
1. Learning objective.
2. Why the concept matters.
3. Prerequisite check.
4. Explanation.
5. Worked example.
6. Interactive example.
7. Prediction exercise.
8. Guided practice.
9. Independent practice.
10. Short assessment.
11. Practical application.
12. Summary.
13. Next recommended activity.
Not every lesson needs every block, but the system must support the complete structure.
10.2 Teach reasoning, not only syntax
For example, do not teach a loop and immediately expect a learner to solve factorial.
First teach:
Iteration
    ↓
Changing state
    ↓
Counter
    ↓
Accumulator
    ↓
Product accumulator
    ↓
Factorial

The lesson should explain:
- What changes.
- What remains constant.
- What the variables represent.
- What their initial values should be.
- What happens on each iteration.
- When the loop stops.
- How to trace the result manually.
The learner must be able to understand the solution before being expected to construct it independently.
PART XI — PRACTICE ENGINE
11. Progressive difficulty
Implement the following progression:
Level 1 — Recognition
Identify a concept or correct approach.
Level 2 — Prediction
Predict output or variable state.
Level 3 — Completion
Fill missing code.
Level 4 — Guided construction
Construct a solution with limited hints.
Level 5 — Independent problem
Solve from requirements.
Level 6 — Variation
Solve a modified problem.
Level 7 — Combined concepts
Combine multiple previously learned concepts.
Level 8 — Practical application
Use the concept in a realistic task.
The practice engine must support:
- Difficulty.
- Topic associations.
- Prerequisites.
- Attempts.
- Hints.
- Solutions.
- Evaluation.
- Progress.
- Mistake classification.
- Review eligibility.
Do not reveal complete solutions automatically after every failed attempt.
PART XII — CODING LAB
12. Build a functional coding environment
Use Monaco Editor.
The coding interface should contain:
┌──────────────────────────────────────────┐
│ Problem title and difficulty              │
├──────────────────────┬───────────────────┤
│ Instructions         │ Code editor       │
│ Examples             │                   │
│ Constraints          │                   │
│ Hints                │                   │
├──────────────────────┴───────────────────┤
│ Run      Submit      Reset                │
├──────────────────────────────────────────┤
│ Output / Test results / Errors             │
└──────────────────────────────────────────┘

Implement:
- Editable code.
- Run.
- Submit.
- Reset.
- Input where required.
- Visible test cases.
- Hidden test cases.
- Test result display.
- Runtime errors.
- Syntax errors.
- Timeouts.
- Attempt history.
- Hints.
- Solution reveal.
- Submission evaluation.
Execution architecture
Do not execute arbitrary learner code directly in the FastAPI process.
Use an isolated execution service.
Browser
   ↓
FastAPI
   ↓
Execution service
   ↓
Isolated worker
   ↓
Language runtime
   ↓
Test evaluation
   ↓
Sanitized result

The execution environment must have:
- Strict timeouts.
- CPU limits.
- Memory limits.
- Restricted filesystem access.
- No unrestricted network access.
- Process isolation.
- Temporary workspaces.
- Output limits.
- Automatic cleanup.
Do not assume that disabling Python imports is sufficient security.
If a secure sandbox cannot be established in the current environment, implement the interface and execution-service boundary, document the limitation, and never falsely describe the runner as production-safe.
Execution testing
Verify behavior for:
- Correct solutions.
- Incorrect solutions.
- Syntax errors.
- Runtime exceptions.
- Infinite loops.
- Excessive output.
- Resource exhaustion.
- Attempted filesystem access.
- Attempted network access.
PART XIII — HINTS AND MISTAKE INTELLIGENCE
13. Progressive hints
Hints should gradually reveal the reasoning process.
Example:
Hint 1: Identify what changes repeatedly.
Hint 2: Determine which variable stores the running result.
Hint 3: Choose the correct initial value.
Hint 4: Determine how that variable changes during each iteration.
Solution: Reveal the complete answer only when requested or when the activity's rules permit it.
13.1 Mistake classification
Record structured mistake categories:
- Syntax error.
- Wrong operator.
- Incorrect condition.
- Wrong loop boundary.
- Incorrect initialization.
- Incorrect variable update.
- Off-by-one error.
- Wrong data structure.
- Missing return.
- Incorrect assumption.
- Misread requirement.
- Runtime error.
- Logical error.
- Incorrect data transformation.
Each mistake should be associated with the relevant topic and exercise.
13.2 Recurring mistakes
Detect repeated patterns.
Example:
You have made the same loop-boundary
mistake in three different exercises.

Recommended:
Review loop boundaries.
Complete two guided exercises.
Then retry the original problem.

Do not label a learner weak based on one failed attempt.
Use repeated evidence and relevant context.
PART XIV — ASSESSMENT ENGINE
14. Required assessment types
Implement:
- Micro quizzes.
- Lesson quizzes.
- Topic quizzes.
- Mixed revision quizzes.
- Weakness-focused quizzes.
- Weekly assessments.
- Phase assessments.
- Practical coding exams.
- Mock exams.
- Final assessment.
Question types should include:
- Multiple choice.
- Multiple select.
- Short answer.
- Output prediction.
- Code completion.
- Debugging.
- Ordering.
- Coding problems.
- Practical data tasks.
Where appropriate, grade different dimensions separately:
Conceptual understanding
Application
Problem solving
Code correctness
Debugging
Data reasoning

Do not allow a learner to pass a practical assessment purely through multiple-choice answers.
Store all assessment attempts.
Provide a useful review after submission:
- Score.
- Correct and incorrect responses.
- Explanations.
- Relevant weak topics.
- Recommended next actions.
Do not expose hidden test cases or correct answers before submission.
PART XV — MASTERY ENGINE
15. Track learning states
Use explicit mastery states:
UNSEEN
INTRODUCED
UNDERSTOOD
PRACTICED
APPLIED
ASSESSED
MASTERED

Allow revision to lower current confidence or trigger reassessment without deleting historical records.
Opening a lesson does not demonstrate mastery.
Completing an exercise does not automatically demonstrate mastery.
Mastery must be supported by assessment and application evidence.
15.1 Mastery evidence
Track:
- Assessment performance.
- Coding correctness.
- Independent versus guided completion.
- Attempts.
- Hint usage.
- Recent mistakes.
- Revision performance.
- Recency of successful application.
- Prerequisite mastery.
Implement the initial mastery algorithm as a deterministic, documented service.
Avoid unexplained arbitrary scores.
A reasonable first implementation can use configurable thresholds and evidence requirements.
For example, a topic may require:
1. Completion of the required lesson.
2. Successful guided practice.
3. Independent exercise completion.
4. A passing topic assessment.
5. No unresolved critical prerequisite weakness.
Use configurable rules rather than hard-coding these thresholds throughout the application.
15.2 Historical records
Preserve:
- Previous mastery states.
- Assessment history.
- Mistake history.
- Revision history.
- Mastery transitions.
Current confidence may change; historical evidence must remain available.
PART XVI — REVISION ENGINE
16. Generate revision activities
Revision must be based on learning evidence.
Consider:
- Time since exposure.
- Assessment performance.
- Coding failures.
- Repeated mistakes.
- Topic difficulty.
- Prerequisite weakness.
- Hint dependence.
- Current mastery confidence.
- Previous revision results.
Create a deterministic initial scheduling algorithm.
Do not require an AI API to decide which revision activity is due.
16.1 Revision types
Support:
- Concept recall.
- Output prediction.
- Short coding problems.
- Debugging.
- Explanation in the learner's own words.
- Mixed-topic questions.
- Previous mistakes.
- Prerequisite review.
16.2 Revision queue
Organize the queue into:
- Due now.
- High priority.
- Weak topics.
- Recently failed topics.
- Upcoming reviews.
Completing a revision activity must update the learner's progress and future revision schedule.
PART XVII — DATA ENGINEERING LABS
17. Build realistic data-processing exercises
Sarah must eventually teach data workflows, not just isolated programming syntax.
Create small, version-controlled datasets for exercises.
Examples:
customers.csv
orders.csv
transactions.csv
products.json
application.log
sales.csv

Exercises should cover:
Read
  ↓
Inspect
  ↓
Validate
  ↓
Clean
  ↓
Transform
  ↓
Deduplicate
  ↓
Aggregate
  ↓
Join
  ↓
Load
  ↓
Verify

Implement these progressively as the curriculum introduces the relevant concepts.
Use realistic but manageable datasets.
Do not make every exercise depend on downloading external data.
17.1 Pipeline simulator
Build an interactive pipeline representation:
Source
  ↓
Raw data
  ↓
Validation
  ↓
Transformation
  ↓
Database
  ↓
Analytics

Allow learners to inspect stage inputs and outputs.
Introduce controlled failures such as:
- Malformed JSON.
- Missing columns.
- Duplicate records.
- Null values.
- Incorrect data types.
- Broken transformations.
- Failed loads.
The learner should diagnose and repair the pipeline.
Do not implement a visually impressive simulator with no meaningful underlying state transitions.
PART XVIII — PROJECTS
18. Progressive projects
Implement projects that integrate previously learned skills.
Project 1 — Python CLI application
Practice variables, conditions, loops, and functions.
Project 2 — File processor
Read, validate, and transform local files.
Project 3 — CSV analysis system
Clean, aggregate, and summarize structured data.
Project 4 — API ingestion
Retrieve data from an API and handle errors.
Project 5 — PostgreSQL pipeline
Load and query structured data.
Project 6 — ETL pipeline
Combine ingestion, transformation, validation, and loading.
Project 7 — Dockerized pipeline
Package a pipeline and its dependencies.
Project 8 — Orchestrated pipeline
Use Airflow to schedule and monitor data workflows.
Project 9 — Distributed processing
Introduce Spark and larger-scale processing concepts.
Final capstone
Build an end-to-end Data Engineering system.
The exact project schedule must follow the curriculum dependencies.
Each project must include:
- Objective.
- Requirements.
- Constraints.
- Prerequisites.
- Dataset.
- Setup instructions.
- Milestones.
- Tasks.
- Validation rules.
- Evaluation criteria.
- Hints.
- Completion criteria.
Do not require a learner to use a tool before the curriculum has taught its necessary prerequisites.
PART XIX — KNOWLEDGE MAP
19. Visualize dependencies
Build a graph showing relationships between topics.
Example:
Variables
   ↓
Conditions
   ↓
Loops
   ↓
Accumulators
   ↓
Functions
   ↓
File Processing
   ↓
Pandas
   ↓
ETL
   ↓
Orchestration

Each node should show:
- Topic title.
- Learning status.
- Mastery.
- Prerequisites.
- Weakness indicators.
- Last studied.
- Revision status.
Selecting a node should open the topic.
The graph must use actual curriculum dependencies.
It must remain usable with hundreds of nodes. Provide zoom, filtering, search, and phase selection as appropriate.
PART XX — DASHBOARD DATA AND BEHAVIOR
20. Use real data throughout the dashboard
The dashboard must not be a static prototype.
Every displayed metric must derive from persisted application state or a clearly identified empty state.
The dashboard must answer:
1. What should I study next?
2. What have I been working on?
3. What is incomplete?
4. What should I revise?
5. What am I weak at?
6. What assessment or project is coming next?
Implement the following interactions:
- Sidebar navigation.
- Search.
- Continue Learning.
- Learning-card navigation.
- Recent-activity navigation.
- Calendar month changes.
- Calendar date selection.
- Task completion.
- Revision navigation.
- Assessment navigation.
- Profile/settings navigation.
Provide useful loading, empty, success, and error states.
PART XXI — DATABASE AND PERSISTENCE
21. Create the relational data model
Design a normalized schema appropriate for the application.
Include entities equivalent to:
users
curriculum_phases
curriculum_days
topics
topic_dependencies
lessons
lesson_blocks
exercises
coding_problems
test_cases
quiz_questions
assessments
projects
datasets
user_topic_progress
user_lesson_progress
user_exercise_attempts
coding_attempts
quiz_attempts
assessment_attempts
mistakes
revision_items
mastery_events
project_progress
learning_events

You may combine or separate entities where justified by the actual implementation.
Avoid unnecessary duplication.
Use foreign keys, constraints, indexes, and transactions appropriately.
21.1 Migrations
Use Alembic.
Create initial migrations.
Test that:
1. A new database can be initialized.
2. Migrations apply successfully.
3. Seed data loads correctly.
4. Application queries work.
5. Existing learner progress survives non-destructive schema updates.
Never reset a working database merely to simplify development.
Never perform destructive migrations without explicit approval.
21.2 Persistence requirements
Persist:
- Lesson progress.
- Exercise attempts.
- Coding attempts.
- Quiz results.
- Assessment results.
- Mastery changes.
- Mistakes.
- Revision schedules.
- Project progress.
- Learning history.
Refreshing the browser must not silently erase progress.
Use server persistence as the source of truth.
PART XXII — LEARNING EVENT HISTORY
22. Record meaningful events
Use structured learning events rather than storing only a percentage.
Examples:
lesson_started
lesson_completed
exercise_attempted
exercise_passed
exercise_failed
quiz_completed
assessment_completed
mistake_detected
revision_completed
mastery_updated
project_started
project_completed

Events should contain relevant identifiers, timestamps, and associated data.
Use them to reconstruct learning history and support analytics.
Avoid building a complex event-sourcing architecture unnecessarily. A conventional relational model with an append-only learning-event table is sufficient initially.
PART XXIII — AI INTEGRATION
23. AI must remain optional
Sarah must teach the curriculum without depending on an external language model.
Do not require an AI API key to run the application or complete core learning activities.
Optional future AI capabilities may include:
- Alternative explanations.
- Additional examples.
- Debugging assistance.
- Natural-language questions.
- Personalized hints.
- Code explanation.
Do not implement fake AI responses.
Do not add an AI chat panel merely to make the application appear intelligent.
If AI integration is implemented, isolate it behind a provider interface and configure it through environment variables.
When no provider is configured, the application must remain fully functional without AI.
PART XXIV — CONTENT VALIDATION
24. Validate learning content automatically
Create a content validation system.
For every topic, verify:
- Valid identifiers.
- Valid prerequisites.
- Learning objectives.
- Lesson references.
- Exercise references.
- Assessment references.
- Answer validity.
- Mastery criteria.
- Revision criteria.
For coding exercises, verify:
- Test cases are valid.
- Reference solutions execute.
- Expected outputs match.
- Hidden tests work.
- Error cases are handled.
For the complete curriculum, verify:
- Exactly 250 numbered days.
- No missing day numbers.
- Valid phase assignments.
- Valid topic references.
- No unresolved dependencies.
- No circular prerequisite dependencies.
- No broken lesson references.
Run these checks automatically.
Do not silently ignore invalid content.
PART XXV — CURRICULUM CONTENT QUALITY
25. Build complete content, not empty placeholders
A curriculum entry containing only a title is not a completed lesson.
Do not fill all 250 days with repeated placeholder text.
Do not generate hundreds of nearly identical exercises.
Do not label an empty topic as complete.
Each learning activity must teach or assess something specific.
Content-generation workflow
1. Finalize the curriculum structure.
2. Validate the topic dependencies.
3. Establish the lesson-content schema.
4. Create representative lessons.
5. Validate their quality and interactions.
6. Expand content phase by phase.
7. Test code examples.
8. Validate assessments.
9. Check prerequisite consistency.
10. Track content completeness.
Create a curriculum completeness report.
Distinguish:
- Planned.
- Drafted.
- Validated.
- Available in the application.
If a topic has not been fully authored, represent that state honestly.
The completed product must contain the entire 250-day curriculum structure and substantive, validated teaching content. Continue the content work until all required days are populated and validated; do not stop after the initial demonstration lessons.
PART XXVI — AUTHENTICATION AND USER MODEL
26. Start with a reliable single-learner experience
Do not make a complex authentication system the first development task.
First establish the learning engine and persistence.
Use a clearly defined development-user mechanism so the application can be tested locally without authentication infrastructure blocking progress.
Then implement the intended user model.
Before exposing the application publicly, implement appropriate authentication and authorization.
Never leave production data accessible merely because development uses a single learner.
Keep user identity separate from curriculum definitions.
Multiple learners should eventually be able to share the same curriculum while maintaining separate progress.
PART XXVII — DOCTRINE INTEGRATION
27. Keep integration optional
Provide a stable interface for exporting summarized learning progress.
Example:
{
  "current_day": 37,
  "current_phase": 2,
  "curriculum_completion": 0.31,
  "mastered_topics": 42,
  "weak_topics": [
    "loop_boundaries",
    "dictionary_access"
  ],
  "current_project": "CSV Data Processor",
  "latest_assessment_score": 84
}

The values above are illustrative schema examples, not real progress.
Implement an API that can produce actual data in this shape.
Document authentication and integration requirements.
Do not hard-code the example values.
Do not require a live Doctrine connection for Sarah to function.
PART XXVIII — OFFLINE AND ERROR RECOVERY
28. Protect learner progress
Where practical:
- Cache curriculum content.
- Preserve lesson state.
- Recover interrupted activities.
- Retry safe network requests.
- Handle failed submissions.
- Prevent duplicate writes where possible.
- Show clear connectivity errors.
- Preserve unsent work locally when safe.
- Resume interrupted lessons.
Do not implement offline synchronization in a way that can overwrite newer server data silently.
If full offline execution is outside the initial implementation scope, implement robust online persistence and document the remaining limitation accurately.
PART XXIX — DEVELOPMENT STAGES
29. Follow this exact implementation sequence
Do not attempt to build every subsystem simultaneously.
Stage 1 — Environment and foundation
- Inspect the empty directory.
- Create the repository structure.
- Initialize frontend and backend.
- Configure TypeScript.
- Configure Python dependencies.
- Configure environment variables.
- Configure database access.
- Add linting and formatting.
- Add initial tests.
- Create documentation.
- Verify the development environment.
Exit condition: Frontend and backend start successfully, and the initial automated tests pass.
Stage 2 — Database and curriculum foundation
- Design schema.
- Add migrations.
- Define curriculum schemas.
- Create curriculum loader.
- Add seed data.
- Build curriculum validation.
- Add representative curriculum content.
Exit condition: A new database initializes successfully, curriculum loads, and schema validation passes.
Stage 3 — Dashboard and visual shell
- Implement the three-column layout.
- Match the supplied reference.
- Implement responsive navigation.
- Build the welcome panel.
- Build learning cards.
- Build recent activity.
- Build profile panel.
- Build calendar.
- Build task list.
- Connect available data.
- Add loading, empty, and error states.
Exit condition: The dashboard works at desktop and mobile sizes and uses real application data where available.
Stage 4 — Curriculum navigation
- Build phase navigation.
- Build day navigation.
- Build topic pages.
- Implement prerequisite indicators.
- Implement completion states.
- Implement search.
- Implement continue-learning navigation.
Exit condition: The learner can navigate the complete curriculum structure.
Stage 5 — Lesson engine
- Define typed content blocks.
- Implement lesson rendering.
- Implement code examples.
- Implement prediction activities.
- Implement reveal interactions.
- Implement traces.
- Implement completion.
- Persist progress.
Exit condition: A lesson can be completed and progress survives a refresh.
Stage 6 — Practice engine
- Implement question schemas.
- Implement question rendering.
- Implement progressive difficulty.
- Implement hints.
- Implement answer validation.
- Implement attempt history.
- Implement mistake classification.
Exit condition: Practice activities are evaluated correctly and results persist.
Stage 7 — Coding lab
- Implement Monaco.
- Implement the execution API.
- Implement isolated execution.
- Implement test cases.
- Implement submission results.
- Implement hints.
- Implement attempt history.
- Test security boundaries.
Exit condition: Coding exercises execute correctly in the intended isolated environment, or any unsupported execution mode is explicitly documented and disabled rather than falsely presented as secure.
Stage 8 — Assessment engine
- Implement quizzes.
- Implement topic assessments.
- Implement mixed revision quizzes.
- Implement phase assessments.
- Implement practical exams.
- Store attempts.
- Generate feedback.
- Add tests.
Exit condition: Assessments are scored correctly and results persist.
Stage 9 — Mastery and revision
- Implement mastery rules.
- Record mastery events.
- Implement revision scheduling.
- Implement revision queues.
- Detect repeated mistakes.
- Recommend prerequisite reviews.
- Update dashboard tasks.
Exit condition: Assessment and practice results influence mastery and revision in a deterministic, tested way.
Stage 10 — Projects and data labs
- Implement project pages.
- Implement datasets.
- Implement data-processing activities.
- Implement pipeline simulations.
- Add evaluation criteria.
- Track project progress.
Exit condition: The learner can complete and track at least one fully functional end-to-end Data Engineering project, with the remaining projects represented by validated curriculum content.
Stage 11 — Full curriculum population
- Populate all 250 days.
- Add all required topics.
- Author lessons.
- Add practice.
- Add assessments.
- Add coding exercises.
- Add revision links.
- Add projects where appropriate.
- Validate content.
- Fix missing references.
Exit condition: All 250 days contain substantive, validated curriculum content, and the curriculum validation report passes.
Stage 12 — Integration and production hardening
- Implement progress export.
- Add authentication and authorization appropriate to the deployment.
- Validate migrations.
- Improve error handling.
- Test responsive behavior.
- Test performance.
- Review accessibility.
- Review security.
- Finalize deployment documentation.
Exit condition: All critical acceptance tests pass and deployment instructions are reproducible.
PART XXX — TESTING REQUIREMENTS
30. Automated tests
Create tests at multiple levels.
Unit tests
Test:
- Curriculum validation.
- Dependency resolution.
- Mastery calculations.
- Revision scheduling.
- Answer evaluation.
- Mistake classification.
- Assessment scoring.
Integration tests
Test:
- API and database.
- Lesson progress persistence.
- Exercise attempts.
- Assessment results.
- Revision updates.
- Curriculum retrieval.
End-to-end tests
Implement at least the following user journey:
Open Sarah
    ↓
Open curriculum
    ↓
Select a day
    ↓
Open a lesson
    ↓
Complete an interactive activity
    ↓
Solve an exercise
    ↓
Submit a quiz
    ↓
Persist the results
    ↓
Update mastery
    ↓
Generate a revision item
    ↓
Complete revision
    ↓
Verify updated progress

Visual tests
Where supported, use screenshots or browser inspection to verify:
- Desktop layout.
- Mobile layout.
- Sidebar behavior.
- Dashboard alignment.
- Table responsiveness.
- Calendar layout.
- Empty states.
- Long content.
- Loading states.
Do not claim visual verification if you have not inspected the rendered application.
PART XXXI — SECURITY REQUIREMENTS
31. Security review
Review:
- Input validation.
- SQL injection risks.
- Cross-site scripting.
- Authentication.
- Authorization.
- Secret management.
- Error-message leakage.
- Rate limiting.
- Code execution isolation.
- Resource exhaustion.
- Dependency vulnerabilities.
- Upload validation, if uploads are implemented.
Never commit secrets.
Provide .env.example with placeholder values.
Do not place actual API keys in source code.
Do not expose hidden test cases through frontend responses.
Do not trust client-submitted scores or mastery values.
The backend must validate assessment results and update learning state.
PART XXXII — PERFORMANCE AND ACCESSIBILITY
32. Performance
Ensure:
- Curriculum pages do not load unnecessary content.
- Large lesson bodies render efficiently.
- Knowledge-map rendering remains usable.
- Coding interactions remain responsive.
- Database queries avoid unnecessary repeated loading.
- Loading states are visible.
- Search remains responsive.
- The application handles a substantial curriculum without loading every lesson simultaneously.
Use pagination, lazy loading, or virtualization where justified.
Do not prematurely optimize without evidence.
32.1 Accessibility
Implement:
- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Accessible form labels.
- Sufficient color contrast.
- Appropriate ARIA attributes.
- Keyboard-accessible interactive lessons.
- Accessible dialogs.
- Reduced-motion support.
Do not make essential interactions dependent on hover alone.
PART XXXIII — FINAL ACCEPTANCE CRITERIA
33. Sarah is not complete until these requirements are met
Application
- Frontend runs.
- Backend runs.
- Database initializes.
- Migrations work.
- Routes work.
- Errors are handled.
Visual design
- Dashboard follows the supplied reference.
- Three-column desktop layout exists.
- Sidebar navigation works.
- Right sidebar exists.
- Calendar works.
- Dashboard uses actual application data.
- Mobile layout is usable.
Curriculum
- All 250 days exist.
- Topic dependencies are valid.
- Lessons contain substantive content.
- References resolve.
- Validation passes.
Learning
- Lessons render correctly.
- Interactive activities work.
- Practice is evaluated.
- Hints work.
- Coding submissions work in the intended execution environment.
- Assessments are scored correctly.
Progress intelligence
- Progress persists.
- Mistakes are recorded.
- Mastery updates from evidence.
- Revision is scheduled.
- Weaknesses influence recommendations.
Projects
- Project pages work.
- Datasets load.
- At least one end-to-end Data Engineering project is fully functional.
- Project progress persists.
Reliability
- Critical automated tests pass.
- No known critical defects remain.
- Database migrations are reproducible.
- Security limitations are documented.
- Setup instructions work on a clean environment.
Documentation
- Architecture documented.
- Database documented.
- API documented.
- Curriculum documented.
- Testing documented.
- Deployment documented.
- Known limitations documented.
Do not report success solely because the frontend compiles.
PART XXXIV — FINAL EXECUTION INSTRUCTIONS
34. Begin now
Start with the empty directory.
Your first actions must be:
1. Inspect the directory and available development environment.
2. Establish the project structure.
3. Create the architecture and implementation-status documents.
4. Define the initial curriculum and content schemas.
5. Initialize the frontend, backend, and database configuration.
6. Implement the first complete vertical slice.
7. Run and verify it.
8. Continue through the remaining stages.
Do not respond with another plan.
The plan is already provided. Execute it.
Do not ask for confirmation after every stage. Proceed autonomously where the requirements are clear and the changes are reversible.
If a genuine blocker occurs, investigate it, try a reasonable alternative, and document the result.
If an external credential is unavailable, continue implementing the parts that do not require it.
Do not delete working code to force a preferred architecture.
Do not claim that a test passed unless you executed it and observed the result.
Do not leave core functionality as placeholders.
Do not stop after the dashboard.
Do not stop after the first vertical slice.
The vertical slice is a validation checkpoint, not the final deliverable.
Maintain the implementation record and continue until all feasible requirements in this specification are implemented and verified.
If the environment imposes a hard limitation, complete everything possible, identify the exact remaining limitation, and provide the precise steps needed to resolve it. Never disguise an incomplete feature as completed.
34.1 Final report
When implementation is complete, produce a concise, factual report containing:
1. What was built.
2. Final architecture.
3. Implemented features.
4. Curriculum completion status.
5. Database and migration status.
6. Tests executed and their actual results.
7. Security verification performed.
8. How to run Sarah locally.
9. How to initialize the database.
10. Required environment variables.
11. How to build for production.
12. Known limitations.
13. Remaining tasks, if any.
Include the commands needed to reproduce the verified setup.
Clearly distinguish implemented features from partially implemented features.
The objective is a working Sarah application, not a convincing demonstration of what Sarah might eventually become.
END OF IMPLEMENTATION SPECIFICATION
Important operating advice
Because you are using a coding agent for a large project, give it the prompt above once, then let it inspect the environment and start working.
If it begins generating dozens of files without running the application, interrupt it and tell it to complete the current stage, execute the relevant tests, and update docs/IMPLEMENTATION_STATUS.md before proceeding.
Do not let it treat a successful build as proof that the learning system works. A successful build proves only that the application can be compiled; the learning workflow, database persistence, assessment logic, and revision behavior require separate verification.
The most important checkpoint is the first complete learning journey:
Open a lesson → interact with the concept → solve an exercise → complete an assessment → save progress → receive a revision task.
Once that journey works reliably, the remaining curriculum and features can be added to the same architecture.