import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FolderKanban, CheckCircle, Clock, Play, Code, Database, GitBranch, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const projects = [
  { id: "cli-app", title: "Python CLI Application", phase: 1, status: "completed", progress: 100, milestones: 3 },
  { id: "file-processor", title: "File Processor", phase: 2, status: "in_progress", progress: 45, milestones: 4 },
  { id: "csv-analysis", title: "CSV Analysis System", phase: 3, status: "available", progress: 0, milestones: 5 },
  { id: "api-ingestion", title: "API Ingestion Pipeline", phase: 4, status: "locked", progress: 0, milestones: 5 },
  { id: "postgres-pipeline", title: "PostgreSQL Pipeline", phase: 5, status: "locked", progress: 0, milestones: 6 },
  { id: "etl-pipeline", title: "ETL Pipeline", phase: 6, status: "locked", progress: 0, milestones: 7 },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Build real Data Engineering projects integrating your skills
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="card-interactive">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center",
                      project.status === "completed" ? "bg-green-100 text-green-700" :
                      project.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                      project.status === "available" ? "bg-muted text-muted-foreground" : "bg-muted/50 text-muted-foreground/50"
                    )}>
                      <FolderKanban className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge variant={
                          project.status === "completed" ? "success" :
                          project.status === "in_progress" ? "default" :
                          project.status === "available" ? "outline" : "secondary"
                        }>
                          {project.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Phase {project.phase} • {project.milestones} milestones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={project.progress} className="w-48 h-2" />
                    <span className="font-mono text-sm">{project.progress}%</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" variant={project.status === "locked" ? "outline" : "default"} disabled={project.status === "locked"}>
                    {project.status === "completed" ? "View Project" : project.status === "in_progress" ? "Continue" : "Start Project"}
                  </Button>
                  <Button variant="outline">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4">
          {projects.filter((p) => p.status === "in_progress").map((project) => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">Phase {project.phase} • {project.milestones} milestones</p>
                  </div>
                  <Progress value={project.progress} className="w-48 h-2" />
                </div>
                <Button className="w-full mt-4">Continue Project</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {projects.filter((p) => p.status === "completed").map((project) => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">Completed • Phase {project.phase}</p>
                    </div>
                  </div>
                  <Badge variant="success">100% Complete</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">View Project</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
