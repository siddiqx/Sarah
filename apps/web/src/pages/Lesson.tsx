import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Code2, HelpCircle, Play, Pause, Square } from "lucide-react";
import { Link } from "react-router-dom";

const lessonContent = {
  id: 15,
  title: "Introduction to Recursion",
  phase: "Phase 2: Core Programming Concepts",
  duration: "45 min",
  difficulty: "Intermediate",
  objectives: [
    "Understand what recursion is and when to use it",
    "Identify base cases and recursive cases",
    "Write recursive functions for common problems",
    "Understand the call stack and stack overflow",
  ],
  theory: `
# Introduction to Recursion

Recursion is a programming technique where a function calls itself to solve a problem. It's particularly useful for problems that can be broken down into smaller, similar subproblems.

## Key Concepts

### Base Case
The condition that stops the recursion. Without a base case, the function would call itself infinitely, leading to a stack overflow.

### Recursive Case
The part of the function that calls itself with a modified argument, moving toward the base case.

## Example: Factorial

\`\`\`python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)
\`\`\`

## Call Stack Visualization

When \`factorial(3)\` is called:
1. \`factorial(3)\` calls \`factorial(2)\`
2. \`factorial(2)\` calls \`factorial(1)\`
3. \`factorial(1)\` returns 1 (base case)
4. \`factorial(2)\` returns 2 * 1 = 2
5. \`factorial(3)\` returns 3 * 2 = 6

## Common Pitfalls

1. **Missing base case** - Infinite recursion
2. **Incorrect base case** - Wrong results or infinite recursion
3. **Not moving toward base case** - Infinite recursion
4. **Stack overflow** - Too deep recursion for the call stack
  `,
  exercises: [
    {
      id: 1,
      title: "Factorial Function",
      description: "Implement a recursive factorial function",
      starterCode: "def factorial(n):\n    # Your code here\n    pass",
      solution: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
      tests: [
        "assert factorial(0) == 1",
        "assert factorial(1) == 1",
        "assert factorial(5) == 120",
      ],
    },
    {
      id: 2,
      title: "Fibonacci Sequence",
      description: "Implement recursive Fibonacci",
      starterCode: "def fibonacci(n):\n    # Your code here\n    pass",
      solution: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)",
      tests: [
        "assert fibonacci(0) == 0",
        "assert fibonacci(1) == 1",
        "assert fibonacci(10) == 55",
      ],
    },
  ],
};

export function Lesson() {
  const { lessonId } = useParams();
  const lesson = lessonContent;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/curriculum"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <Badge variant="secondary">{lesson.phase}</Badge>
          <h1 className="text-2xl font-bold mt-1">{lesson.title}</h1>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{lesson.duration}</span>
          <Badge variant="outline">{lesson.difficulty}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="theory">
            <TabsList>
              <TabsTrigger value="theory"><BookOpen className="mr-2 h-4 w-4" />Theory</TabsTrigger>
              <TabsTrigger value="exercises"><Code2 className="mr-2 h-4 w-4" />Exercises</TabsTrigger>
              <TabsTrigger value="quiz"><HelpCircle className="mr-2 h-4 w-4" />Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="theory" className="space-y-4">
              <Card>
                <CardContent className="prose prose-sm max-w-none p-6">
                  <div dangerouslySetInnerHTML={{ __html: lesson.theory }} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-4">
              {lesson.exercises.map((exercise) => (
                <Card key={exercise.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <Badge variant="outline">Exercise {exercise.id}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{exercise.description}</p>
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <pre>{exercise.starterCode}</pre>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline"><Play className="mr-2 h-4 w-4" />Run Code</Button>
                      <Button variant="outline"><Pause className="mr-2 h-4 w-4" />Stop</Button>
                      <Button variant="ghost"><Square className="mr-2 h-4 w-4" />Reset</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Check</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Quiz questions will appear here after completing the exercises.</p>
                  <Button disabled>Start Quiz</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lesson.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{objective}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Progress</CardTitle>
                <span className="text-sm font-medium">65%</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={65} />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Theory: Completed</span>
                <span>Exercises: 1/2</span>
                <span>Quiz: Not Started</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/lesson/14"><ArrowLeft className="mr-2 h-4 w-4" />Previous</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/lesson/16">Next<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
