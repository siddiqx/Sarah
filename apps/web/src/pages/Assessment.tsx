import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, HelpCircle, Flag, Shield, Target } from "lucide-react";
import { Link } from "react-router-dom";

const assessmentData = {
  id: 1,
  title: "Control Flow Assessment",
  phase: "Phase 1: Foundations",
  type: "Quiz",
  description: "Test your understanding of conditionals, loops, and control flow statements.",
  timeLimit: 30,
  questions: 15,
  passingScore: 70,
  attempts: 3,
  bestScore: 92,
  status: "passed",
  topics: ["Conditionals", "Loops", "Break/Continue", "Nested Structures"],
  questionsList: [
    { id: 1, type: "multiple-choice", topic: "Conditionals", difficulty: "Easy", status: "correct" },
    { id: 2, type: "multiple-choice", topic: "Loops", difficulty: "Easy", status: "correct" },
    { id: 3, type: "code-completion", topic: "Nested Loops", difficulty: "Medium", status: "correct" },
    { id: 4, type: "multiple-choice", topic: "Break/Continue", difficulty: "Medium", status: "incorrect" },
    { id: 5, type: "debugging", topic: "Infinite Loop", difficulty: "Hard", status: "correct" },
    { id: 6, type: "multiple-choice", topic: "Conditionals", difficulty: "Easy", status: "correct" },
    { id: 7, type: "code-completion", topic: "While Loops", difficulty: "Medium", status: "correct" },
    { id: 8, type: "multiple-choice", topic: "For Loops", difficulty: "Easy", status: "correct" },
    { id: 9, type: "debugging", topic: "Off-by-one", difficulty: "Hard", status: "incorrect" },
    { id: 10, type: "multiple-choice", topic: "Nested Structures", difficulty: "Medium", status: "correct" },
    { id: 11, type: "code-completion", topic: "Loop Control", difficulty: "Medium", status: "pending" },
    { id: 12, type: "multiple-choice", topic: "Conditionals", difficulty: "Easy", status: "pending" },
    { id: 13, type: "debugging", topic: "Logic Error", difficulty: "Hard", status: "pending" },
    { id: 14, type: "code-completion", topic: "Nested Loops", difficulty: "Medium", status: "pending" },
    { id: 15, type: "multiple-choice", topic: "Best Practices", difficulty: "Easy", status: "pending" },
  ],
};

export function Assessment() {
  const { assessmentId } = useParams();
  const assessment = assessmentData;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "correct": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "incorrect": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return <Badge variant="success">{difficulty}</Badge>;
      case "Medium": return <Badge variant="warning">{difficulty}</Badge>;
      case "Hard": return <Badge variant="destructive">{difficulty}</Badge>;
      default: return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/curriculum"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <Badge variant="secondary">{assessment.phase}</Badge>
          <h1 className="text-2xl font-bold mt-1">{assessment.title}</h1>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Badge variant={assessment.status === "passed" ? "success" : assessment.status === "failed" ? "destructive" : "outline"}>
            {assessment.status === "passed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
            {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview"><Flag className="mr-2 h-4 w-4" />Overview</TabsTrigger>
              <TabsTrigger value="questions"><HelpCircle className="mr-2 h-4 w-4" />Questions</TabsTrigger>
              <TabsTrigger value="results"><Target className="mr-2 h-4 w-4" />Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">{assessment.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Type</p>
                      <p className="text-muted-foreground">{assessment.type}</p>
                    </div>
                    <div>
                      <p className="font-medium">Time Limit</p>
                      <p className="text-muted-foreground">{assessment.timeLimit} min</p>
                    </div>
                    <div>
                      <p className="font-medium">Questions</p>
                      <p className="text-muted-foreground">{assessment.questions}</p>
                    </div>
                    <div>
                      <p className="font-medium">Passing Score</p>
                      <p className="text-muted-foreground">{assessment.passingScore}%</p>
                    </div>
                    <div>
                      <p className="font-medium">Attempts Allowed</p>
                      <p className="text-muted-foreground">{assessment.attempts}</p>
                    </div>
                    <div>
                      <p className="font-medium">Best Score</p>
                      <p className="text-muted-foreground">{assessment.bestScore}%</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-medium">Topics Covered</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {assessment.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    {assessment.status === "passed" ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="h-5 w-5" />
                        <span>Congratulations! You passed this assessment.</span>
                      </div>
                    ) : assessment.status === "failed" ? (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>You did not pass. Review the material and try again.</span>
                      </div>
                    ) : (
                      <Button className="w-full" size="lg">Start Assessment</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assessment.questionsList.map((q) => (
                    <div key={q.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                        {q.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">Question {q.id} - {q.type.replace("-", " ")}</p>
                        <p className="text-xs text-muted-foreground">{q.topic}</p>
                      </div>
                      {getDifficultyBadge(q.difficulty)}
                      <div className="flex items-center gap-2">{getStatusIcon(q.status)}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Results</CardTitle>
                    <Badge variant="success">{assessment.bestScore}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={assessment.bestScore} className="h-4" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-500">13</p>
                      <p className="text-sm text-muted-foreground">Correct</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-500">2</p>
                      <p className="text-sm text-muted-foreground">Incorrect</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-muted-foreground">0</p>
                      <p className="text-sm text-muted-foreground">Skipped</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">Review Incorrect Answers</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assessment Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={assessment.status === "passed" ? "success" : "outline"}>
                  {assessment.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Attempts Used</span>
                <span>1/{assessment.attempts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time Remaining</span>
                <span>{assessment.timeLimit} min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Questions Answered</span>
                <span>10/{assessment.questions}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {assessment.status !== "passed" && (
                <Button className="w-full" size="lg">Start Assessment</Button>
              )}
              {assessment.status === "passed" && (
                <Button variant="outline" className="w-full">Retake Assessment</Button>
              )}
              <Button variant="ghost" className="w-full justify-start">Review Study Materials</Button>
              <Button variant="ghost" className="w-full justify-start">View Past Attempts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
