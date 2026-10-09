import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Code2, FileText, Terminal, GitBranch, Star, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const projectData = {
  id: 1,
  title: "CLI Task Manager",
  phase: "Phase 1: Foundations",
  description: "Build a command-line task management application with CRUD operations, data persistence, and user interaction.",
  difficulty: "Beginner",
  estimatedTime: "3-4 hours",
  requirements: [
    "Create, read, update, delete tasks",
    "Persist tasks to JSON file",
    "Filter tasks by status (todo, in-progress, done)",
    "Mark tasks as complete/incomplete",
    "List all tasks with formatting",
    "Input validation and error handling",
  ],
  starterFiles: [
    { name: "main.py", language: "python", content: "# TODO: Implement CLI task manager\nimport json\nimport sys\n\nclass TaskManager:\n    def __init__(self, filename='tasks.json'):\n        self.filename = filename\n        self.tasks = []\n    \n    def load(self):\n        pass\n    \n    def save(self):\n        pass\n    \n    def add(self, title):\n        pass\n    \n    def list(self, filter_status=None):\n        pass\n    \n    def complete(self, task_id):\n        pass\n    \n    def delete(self, task_id):\n        pass\n\nif __name__ == '__main__':\n    pass" },
    { name: "tasks.json", language: "json", content: "[]" },
  ],
  rubric: [
    { criterion: "Functionality", weight: 40, description: "All CRUD operations work correctly" },
    { criterion: "Code Quality", weight: 25, description: "Clean, readable, well-structured code" },
    { criterion: "Error Handling", weight: 20, description: "Proper validation and error messages" },
    { criterion: "Persistence", weight: 15, description: "Data correctly saved/loaded from file" },
  ],
  testCases: [
    { input: "python main.py add \"Learn Python\"", expected: "Task added successfully" },
    { input: "python main.py list", expected: "Shows all tasks" },
    { input: "python main.py complete 1", expected: "Task 1 marked complete" },
    { input: "python main.py list --filter done", expected: "Shows only completed tasks" },
  ],
};

export function Project() {
  const { projectId } = useParams();
  const project = projectData;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/curriculum"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <Badge variant="secondary">{project.phase}</Badge>
          <h1 className="text-2xl font-bold mt-1">{project.title}</h1>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{project.estimatedTime}</span>
          <Badge variant="outline">{project.difficulty}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview"><FileText className="mr-2 h-4 w-4" />Overview</TabsTrigger>
              <TabsTrigger value="requirements"><CheckCircle2 className="mr-2 h-4 w-4" />Requirements</TabsTrigger>
              <TabsTrigger value="code"><Code2 className="mr-2 h-4 w-4" />Code Editor</TabsTrigger>
              <TabsTrigger value="tests"><Terminal className="mr-2 h-4 w-4" />Test Cases</TabsTrigger>
              <TabsTrigger value="rubric"><Star className="mr-2 h-4 w-4" />Rubric</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Phase</p>
                      <p className="text-muted-foreground">{project.phase}</p>
                    </div>
                    <div>
                      <p className="font-medium">Estimated Time</p>
                      <p className="text-muted-foreground">{project.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="font-medium">Difficulty</p>
                      <p className="text-muted-foreground">{project.difficulty}</p>
                    </div>
                    <div>
                      <p className="font-medium">Starter Files</p>
                      <p className="text-muted-foreground">{project.starterFiles.length} files</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p>{req}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Editor</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Terminal className="mr-2 h-4 w-4" />Run</Button>
                      <Button variant="outline" size="sm"><GitBranch className="mr-2 h-4 w-4" />Submit</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                    <pre>{project.starterFiles[0].content}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Cases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.testCases.map((test, index) => (
                    <div key={index} className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{test.input}</span>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded text-green-600">{test.expected}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rubric" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grading Rubric</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.rubric.map((item, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{item.criterion}</p>
                          <Badge variant="secondary">{item.weight}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={25} />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Files Created</span><span>1/3</span></div>
                <div className="flex justify-between"><span>Tests Passing</span><span>2/8</span></div>
                <div className="flex justify-between"><span>Requirements Met</span><span>3/6</span></div>
              </div>
              <Button className="w-full" variant="outline">Submit for Review</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Starter Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.starterFiles.map((file) => (
                <Button key={file.name} variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <FileText className="h-4 w-4" />
                  {file.name}
                  <Badge variant="outline" className="ml-auto text-xs">{file.language}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">Project Specification PDF</Button>
              <Button variant="ghost" className="w-full justify-start">Example Solution</Button>
              <Button variant="ghost" className="w-full justify-start">Discussion Forum</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
