import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CheckCircle, Play, Code, Database, GitBranch, Target, FileText, Terminal } from "lucide-react";
import { useState } from "react";

const projectData = {
  "file-processor": {
    id: "file-processor",
    title: "File Processor",
    description: "Build a CLI tool to process and validate various file formats.",
    phase: 2,
    prerequisites: ["File I/O", "Error Handling", "CSV/JSON Parsing"],
    milestones: [
      { id: "setup", title: "Project Setup", tasks: ["Initialize repo", "Create virtual env", "Setup CLI structure"], status: "completed" },
      { id: "csv", title: "CSV Processing", tasks: ["Read CSV files", "Validate rows", "Handle missing data"], status: "in_progress" },
      { id: "json", title: "JSON Processing", tasks: ["Parse JSON", "Validate schema", "Transform data"], status: "pending" },
      { id: "excel", title: "Excel Support", tasks: ["Read Excel files", "Write output", "Format cells"], status: "pending" },
    ],
    datasets: ["sample-data.csv", "config.json", "users.xlsx"],
    validationRules: ["All CSV rows must have required columns", "JSON must match schema", "No data loss in transformation"],
  },
};

export function ProjectView() {
  const { projectId } = useParams();
  const data = projectData[projectId as keyof typeof projectData] || projectData["file-processor"];
  const [activeTab, setActiveTab] = useState("overview");

  const completedMilestones = data.milestones.filter((m) => m.status === "completed").length;
  const totalMilestones = data.milestones.length;
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">Phase {data.phase}</Badge>
            <Badge variant={data.milestones[1].status === "in_progress" ? "default" : "secondary"}>
              {data.milestones[1].status.replace("_", " ")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Terminal className="w-4 h-4 mr-2" /> Open in Terminal</Button>
          <Button><Play className="w-4 h-4 mr-2" /> Continue</Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Overall Progress</CardTitle>
            <span className="font-mono text-lg">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3 mb-4" />
          <p className="text-sm text-muted-foreground">{completedMilestones} of {totalMilestones} milestones completed</p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" /> Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.prerequisites.map((p) => (
                  <Badge key={p} variant="outline">{p}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Validation Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.validationRules.map((rule, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {data.milestones.map((milestone, i) => (
            <Card key={milestone.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center",
                      milestone.status === "completed" ? "bg-green-100 text-green-700" :
                      milestone.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                    )}>
                      {milestone.status === "completed" ? <CheckCircle className="w-5 h-5" /> : i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.tasks.length} tasks</p>
                    </div>
                  </div>
                  <Badge variant={
                    milestone.status === "completed" ? "success" :
                    milestone.status === "in_progress" ? "default" : "outline"
                  }>
                    {milestone.status}
                  </Badge>
                </div>
                <div className="mt-4 ml-14 space-y-2">
                  {milestone.tasks.map((task, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={cn("w-4 h-4",
                        milestone.status === "completed" ? "text-green-500" :
                        milestone.status === "in_progress" && j === 0 ? "text-blue-500" : "text-muted-foreground"
                      )} />
                      {task}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          {data.datasets.map((dataset) => (
            <Card key={dataset}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{dataset}</p>
                      <p className="text-sm text-muted-foreground">Ready to use</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {data.validationRules.map((rule, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
