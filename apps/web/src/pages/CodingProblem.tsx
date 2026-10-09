import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Play, CheckCircle, XCircle, Copy, Download, RotateCcw, TerminalSquare } from "lucide-react";
import { useState } from "react";

const problemData = {
  "sum-array": {
    id: "sum-array",
    title: "Sum of Array",
    difficulty: "easy",
    description: "Write a function that returns the sum of all elements in an array.",
    constraints: [
      "Array length: 1 ≤ n ≤ 10^5",
      "Element values: -10^9 ≤ arr[i] ≤ 10^9",
      "Time limit: 1 second",
      "Memory limit: 256 MB",
    ],
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "15", explanation: "1+2+3+4+5 = 15" },
      { input: "[-1, 0, 1]", output: "0", explanation: "-1+0+1 = 0" },
      { input: "[100]", output: "100", explanation: "Single element" },
    ],
    starterCode: "def sum_array(arr: list[int]) -> int:\n    # Your code here\n    pass\n\nif __name__ == \"__main__\":\n    # Test cases\n    print(sum_array([1, 2, 3, 4, 5]))  # 15\n    print(sum_array([-1, 0, 1]))       # 0\n    print(sum_array([100]))            # 100",
    hints: [
      "Initialize a variable to store the running total",
      "Iterate through each element in the array",
      "Add each element to the running total",
      "Return the final total",
    ],
    testCases: [
      { input: "[1, 2, 3]", expected: "6", hidden: false },
      { input: "[]", expected: "0", hidden: false },
      { input: "[-5, -3, -1]", expected: "-9", hidden: true },
      { input: "[1000000] * 100000", expected: "100000000000", hidden: true },
    ],
  },
};

export function CodingProblem() {
  const { problemId } = useParams();
  const data = problemData[problemId as keyof typeof problemData] || problemData["sum-array"];
  const [activeTab, setActiveTab] = useState("editor");
  const [code, setCode] = useState(data.starterCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");

  const handleRun = async () => {
    setStatus("running");
    setOutput("Running...");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setOutput("✓ All tests passed!\nTime: 12ms\nMemory: 8.2 MB");
  };

  const handleSubmit = async () => {
    setStatus("running");
    setOutput("Submitting...");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setOutput("✓ Submission accepted!\nAll 10 test cases passed.\nTime: 12ms\nMemory: 8.2 MB");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={data.difficulty === "easy" ? "success" : data.difficulty === "medium" ? "warning" : "destructive"}>
              {data.difficulty}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="editor"><TerminalSquare className="w-4 h-4 mr-2" /> Editor</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor + Output */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Code Editor</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted px-3 py-2 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-mono text-muted-foreground">main.py</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleRun} disabled={status === "running"}>
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleSubmit} disabled={status === "running"}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-[500px] p-4 font-mono text-sm bg-background border-none focus-visible:outline-none resize-none"
                      spellCheck={false}
                      placeholder="# Write your solution here..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={cn(
                    "w-full h-48 p-4 bg-muted rounded-lg font-mono text-sm overflow-auto",
                    status === "success" && "border-green-500/50",
                    status === "error" && "border-red-500/50"
                  )}>
                    <div className={cn(
                      "flex items-center gap-2 mb-2",
                      status === "running" && "text-yellow-600",
                      status === "success" && "text-green-600",
                      status === "error" && "text-red-600"
                    )}>
                      {status === "running" && <RotateCcw className="w-4 h-4 animate-spin" />}
                      {status === "success" && <CheckCircle className="w-4 h-4" />}
                      {status === "error" && <XCircle className="w-4 h-4" />}
                      <span>{status === "idle" ? "Run your code to see output" : status}</span>
                    </div>
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.hints.map((hint, i) => (
                      <Button key={i} variant="ghost" className="w-full justify-start text-left p-2 text-sm">
                        Hint {i + 1}: {hint}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.testCases.map((tc, i) => (
                      <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono">Input:</span>
                          <span className="font-mono text-primary">{tc.input}</span>
                          {tc.hidden && <Badge variant="outline" className="text-xs">Hidden</Badge>}
                        </div>
                        {!tc.hidden && (
                          <div className="ml-6 flex items-center gap-2">
                            <span className="font-mono">Expected:</span>
                            <span className="font-mono text-green-600">{tc.expected}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="instructions">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3>Problem Description</h3>
                <p>{data.description}</p>
                <h3>Constraints</h3>
                <ul>
                  {data.constraints.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {data.examples.map((ex, i) => (
                  <Card key={i}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-1">Input</label>
                          <pre className="bg-muted p-3 rounded-lg font-mono text-sm">{ex.input}</pre>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-1">Output</label>
                          <pre className="bg-muted p-3 rounded-lg font-mono text-sm">{ex.output}</pre>
                        </div>
                        {ex.explanation && (
                          <div className="col-span-2 text-sm text-muted-foreground">{ex.explanation}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constraints">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {data.constraints.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {c}
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
