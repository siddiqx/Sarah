import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BookOpen, PlayCircle, CheckCircle, Clock, ChevronRight, Lock } from "lucide-react";

const dayData = {
  "15": {
    number: 15,
    phase: 2,
    title: "Dictionary Methods & Operations",
    summary: "Learn to manipulate dictionaries with built-in methods for data transformation.",
    learningObjectives: [
      "Understand dictionary methods: get, setdefault, update, pop",
      "Apply dictionary comprehension for data transformation",
      "Merge and filter dictionaries efficiently",
    ],
    estimatedTime: 90,
    topics: [
      { id: "dict-methods", title: "Dictionary Methods", status: "in_progress", lessons: 3 },
      { id: "dict-comprehension", title: "Dictionary Comprehension", status: "upcoming", lessons: 2 },
      { id: "dict-merging", title: "Merging & Filtering", status: "upcoming", lessons: 2 },
    ],
  },
};

export function DayView() {
  const { day } = useParams();
  const data = dayData[day as keyof typeof dayData] || dayData["15"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Phase {data.phase} • Day {data.number}</Badge>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.summary}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.estimatedTime} min</span>
          <span className="flex items-center gap-1">{data.topics.length} topics</span>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {obj}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Topics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Topics ({data.topics.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topics.map((topic) => (
              <div
                key={topic.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors",
                  topic.status === "completed" && "bg-green-50 border-green-200"
                )}
              >
                <Link to={`/topics/${topic.id}`} className="flex-1 flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    topic.status === "completed" ? "bg-green-100 text-green-700" :
                    topic.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                  )}>
                    {topic.status === "completed" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : topic.status === "in_progress" ? (
                      <PlayCircle className="w-5 h-5" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{topic.title}</h4>
                    <p className="text-sm text-muted-foreground">{topic.lessons} lessons</p>
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    topic.status === "completed" ? "success" :
                    topic.status === "in_progress" ? "default" : "outline"
                  }>
                    {topic.status.replace("_", " ")}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button size="lg" className="w-full max-w-md" asChild>
          <Link to={`/topics/${data.topics[0].id}`}>
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Learning
          </Link>
        </Button>
      </div>
    </div>
  );
}
