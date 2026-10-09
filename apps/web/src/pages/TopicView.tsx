import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, PlayCircle, Code, HelpCircle, Target, BookOpen, CheckCircle } from "lucide-react";

const topicData = {
  "dict-methods": {
    id: "dict-methods",
    title: "Dictionary Methods",
    description: "Learn essential dictionary methods for data manipulation.",
    difficulty: "beginner",
    lessons: [
      { id: "dict-get-setdefault", title: "get() and setdefault()", type: "lesson", status: "completed" },
      { id: "dict-update-pop", title: "update() and pop()", type: "lesson", status: "in_progress" },
      { id: "dict-keys-values-items", title: "keys(), values(), items()", type: "lesson", status: "upcoming" },
    ],
    prerequisites: ["variables", "basic-dict"],
    practiceCount: 5,
    assessmentCount: 1,
  },
};

export function TopicView() {
  const { topicId } = useParams();
  const data = topicData[topicId as keyof typeof topicData] || topicData["dict-methods"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Data Structures</Badge>
            <Badge variant="secondary">{data.difficulty}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </div>
        <Button size="lg" asChild>
          <Link to={`/lessons/${data.lessons[1].id}`}>
            <PlayCircle className="w-4 h-4 mr-2" />
            Continue Learning
          </Link>
        </Button>
      </div>

      {/* Prerequisites */}
      {data.prerequisites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" /> Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.prerequisites.map((preq) => (
                <Badge key={preq} variant="outline">{preq}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Lessons ({data.lessons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors",
                  lesson.status === "completed" && "bg-green-50 border-green-200"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  lesson.status === "completed" ? "bg-green-100 text-green-700" :
                  lesson.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                )}>
                  {lesson.status === "completed" ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">{lesson.type}</p>
                </div>
                <Badge variant={
                  lesson.status === "completed" ? "success" :
                  lesson.status === "in_progress" ? "default" : "outline"
                }>
                  {lesson.status.replace("_", " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice & Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" /> Practice Exercises ({data.practiceCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/practice">
                <ChevronRight className="w-4 h-4 mr-2" />
                Start Practicing
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> Assessments ({data.assessmentCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/assessments">
                <ChevronRight className="w-4 h-4 mr-2" />
                Take Assessment
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
