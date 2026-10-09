import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ClipboardCheck, Clock, Filter, Search, Trophy, Award } from "lucide-react";
import { useState } from "react";

const assessments = [
  { id: "quiz-1", title: "Variables & Types Quiz", type: "micro", phase: 1, questions: 10, timeLimit: 15, status: "passed", score: 92 },
  { id: "quiz-2", title: "Control Flow Quiz", type: "micro", phase: 1, questions: 10, timeLimit: 15, status: "passed", score: 85 },
  { id: "topic-loops", title: "Loops Topic Assessment", type: "topic", phase: 2, questions: 15, timeLimit: 30, status: "available", score: null },
  { id: "phase-1", title: "Phase 1 Assessment", type: "phase", phase: 1, questions: 25, timeLimit: 60, status: "passed", score: 88 },
  { id: "phase-2", title: "Phase 2 Assessment", type: "phase", phase: 2, questions: 25, timeLimit: 60, status: "locked", score: null },
  { id: "practical-1", title: "Data Processing Practical", type: "practical", phase: 3, questions: 5, timeLimit: 120, status: "locked", score: null },
];

export function Assessments() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["all", "micro", "topic", "phase", "practical"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground mt-1">
            Test your knowledge and track your mastery
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {assessments
              .filter((a) => tab === "all" || a.type === tab)
              .map((assessment) => (
                <Card key={assessment.id} className="card-interactive">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            assessment.type === "micro" ? "default" :
                            assessment.type === "topic" ? "secondary" :
                            assessment.type === "phase" ? "destructive" : "warning"
                          }>
                            {assessment.type}
                          </Badge>
                          <Badge variant="outline">Phase {assessment.phase}</Badge>
                        </div>
                        <h3 className="font-semibold">{assessment.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {assessment.questions} questions • {assessment.timeLimit} min
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          {assessment.score !== null ? (
                            <p className="text-2xl font-bold text-primary">{assessment.score}%</p>
                          ) : (
                            <p className="text-muted-foreground">Not attempted</p>
                          )}
                        </div>
                        <Badge variant={
                          assessment.status === "passed" ? "success" :
                          assessment.status === "available" ? "default" : "outline"
                        }>
                          {assessment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" variant={assessment.status === "locked" ? "outline" : "default"} disabled={assessment.status === "locked"}>
                        {assessment.status === "passed" ? "Review" : "Start Assessment"}
                      </Button>
                      <Button variant="outline">Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
