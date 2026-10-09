import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { RotateCcw, Clock, AlertTriangle, Target, BookOpen, Code, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";

const revisionItems = [
  { id: 1, topic: "Loop Boundaries", type: "concept-recall", priority: "high", due: "Today", status: "due" },
  { id: 2, topic: "Dictionary Methods", type: "output-prediction", priority: "high", due: "Today", status: "due" },
  { id: 3, topic: "Function Parameters", type: "short-coding", priority: "medium", due: "Tomorrow", status: "upcoming" },
  { id: 4, topic: "String Manipulation", type: "debugging", priority: "medium", due: "In 2 days", status: "upcoming" },
  { id: 5, topic: "Control Flow", type: "mixed-topic", priority: "low", due: "In 3 days", status: "upcoming" },
];

const weakTopics = [
  { topic: "Loop Boundaries", mistakes: 3, lastFailed: "2 days ago", action: "Review loop boundaries" },
  { topic: "Dictionary Access", mistakes: 2, lastFailed: "5 days ago", action: "Practice .get() method" },
];

export function Revision() {
  const [activeTab, setActiveTab] = useState("queue");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revision Queue</h1>
          <p className="text-muted-foreground mt-1">
            Spaced repetition based on your learning evidence
          </p>
        </div>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" /> Generate Revision
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue"><RotateCcw className="w-4 h-4 mr-2" /> Due Now</TabsTrigger>
          <TabsTrigger value="weak"><AlertTriangle className="w-4 h-4 mr-2" /> Weak Topics</TabsTrigger>
          <TabsTrigger value="schedule"><Clock className="w-4 h-4 mr-2" /> Schedule</TabsTrigger>
          <TabsTrigger value="completed"><CheckCircle className="w-4 h-4 mr-2" /> Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          {revisionItems.filter((r) => r.status === "due").map((item) => (
            <Card key={item.id} className="card-interactive">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center",
                      item.type === "concept-recall" ? "bg-blue-100 text-blue-700" :
                      item.type === "output-prediction" ? "bg-green-100 text-green-700" :
                      item.type === "short-coding" ? "bg-purple-100 text-purple-700" :
                      item.type === "debugging" ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground"
                    )}>
                      {item.type === "concept-recall" && <BookOpen className="w-5 h-5" />}
                      {item.type === "output-prediction" && <Target className="w-5 h-5" />}
                      {item.type === "short-coding" && <Code className="w-5 h-5" />}
                      {item.type === "debugging" && <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.topic}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{item.type.replace("-", " ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "warning" : "secondary"}>
                      {item.priority}
                    </Badge>
                    <Badge variant="outline">{item.due}</Badge>
                    <Button size="sm">Start</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="weak" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Recurring Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weakTopics.map((w) => (
                  <div key={w.topic} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">{w.topic}</p>
                      <p className="text-sm text-muted-foreground">{w.mistakes} recent mistakes • Last failed: {w.lastFailed}</p>
                    </div>
                    <Button variant="outline" size="sm">{w.action}</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {revisionItems.filter((r) => r.status === "upcoming").map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.topic}</span>
                      <Badge variant="outline">{item.type.replace("-", " ")}</Badge>
                    </div>
                    <Badge variant="secondary">{item.due}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">No completed revisions yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
