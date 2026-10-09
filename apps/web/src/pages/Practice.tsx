import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Dumbbell, Target, Trophy, Clock, Filter, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const practiceTopics = [
  { id: "variables", name: "Variables & Types", exercises: 12, completed: 8, mastery: 65 },
  { id: "control-flow", name: "Control Flow", exercises: 15, completed: 10, mastery: 60 },
  { id: "loops", name: "Loops", exercises: 18, completed: 5, mastery: 25 },
  { id: "functions", name: "Functions", exercises: 14, completed: 0, mastery: 0 },
  { id: "data-structures", name: "Data Structures", exercises: 20, completed: 0, mastery: 0 },
];

const recentAttempts = [
  { topic: "Loops", exercise: "For Loop Basics", status: "passed", score: 85, time: "2 hours ago" },
  { topic: "Control Flow", exercise: "Nested Conditions", status: "failed", score: 45, time: "5 hours ago" },
  { topic: "Variables", exercise: "Type Conversion", status: "passed", score: 92, time: "1 day ago" },
];

export function Practice() {
  const [activeTab, setActiveTab] = useState("topics");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Practice</h1>
          <p className="text-muted-foreground mt-1">
            Strengthen your skills with progressive exercises
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="topics"><Dumbbell className="w-4 h-4 mr-2" /> By Topic</TabsTrigger>
          <TabsTrigger value="weaknesses"><Target className="w-4 h-4 mr-2" /> Weak Areas</TabsTrigger>
          <TabsTrigger value="history"><Clock className="w-4 h-4 mr-2" /> History</TabsTrigger>
        </TabsList>

        <TabsContent value="topics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceTopics.map((topic) => (
              <Card key={topic.id} className="card-interactive">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{topic.name}</h3>
                      <p className="text-sm text-muted-foreground">{topic.exercises} exercises</p>
                    </div>
                    <Badge variant={topic.mastery > 50 ? "success" : topic.mastery > 0 ? "warning" : "outline"}>
                      {topic.mastery}% mastery
                    </Badge>
                  </div>
                  <Progress value={topic.mastery} className="h-2 mb-4" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{topic.completed}/{topic.exercises} completed</span>
                  </div>
                  <Button className="w-full" variant={topic.completed > 0 ? "default" : "outline"}>
                    {topic.completed > 0 ? "Continue" : "Start"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weaknesses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" /> Topics Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <WeaknessItem topic="Loop Boundaries" issue="Off-by-one errors in 3 exercises" action="Review loop boundaries" />
                <WeaknessItem topic="Dictionary Access" issue="KeyError in 2 exercises" action="Practice .get() method" />
                <WeaknessItem topic="String Methods" issue="Confusion between methods" action="Review string methods" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Exercise</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttempts.map((attempt, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-3 font-medium">{attempt.topic}</td>
                        <td className="p-3">{attempt.exercise}</td>
                        <td className="p-3">
                          <Badge variant={attempt.status === "passed" ? "success" : "destructive"}>
                            {attempt.status}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono">{attempt.score}%</td>
                        <td className="p-3 text-sm text-muted-foreground">{attempt.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WeaknessItem({ topic, issue, action }: { topic: string; issue: string; action: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent">
      <div>
        <p className="font-medium">{topic}</p>
        <p className="text-sm text-muted-foreground">{issue}</p>
      </div>
      <Button variant="outline" size="sm">{action}</Button>
    </div>
  );
}
