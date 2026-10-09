import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Terminal, Filter, Search, Play, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const codingProblems = [
  { id: "sum-array", title: "Sum of Array", difficulty: "easy", topic: "Loops", status: "solved", acceptance: 78 },
  { id: "find-max", title: "Find Maximum", difficulty: "easy", topic: "Loops", status: "solved", acceptance: 82 },
  { id: "reverse-string", title: "Reverse String", difficulty: "easy", topic: "Strings", status: "attempted", acceptance: 65 },
  { id: "count-vowels", title: "Count Vowels", difficulty: "medium", topic: "Strings", status: "unsolved", acceptance: 54 },
  { id: "two-sum", title: "Two Sum", difficulty: "medium", topic: "Data Structures", status: "unsolved", acceptance: 42 },
  { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "medium", topic: "Data Structures", status: "unsolved", acceptance: 38 },
  { id: "merge-intervals", title: "Merge Intervals", difficulty: "hard", topic: "Algorithms", status: "unsolved", acceptance: 28 },
];

const difficulties = ["all", "easy", "medium", "hard"];

export function CodingLab() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = codingProblems.filter((p) =>
    (filter === "all" || p.difficulty === filter) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coding Lab</h1>
          <p className="text-muted-foreground mt-1">
            Solve algorithmic problems with the Monaco editor
          </p>
        </div>
        <Button>
          <Play className="w-4 h-4 mr-2" /> New Problem
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm"
              />
            </div>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <Button
                  key={d}
                  variant={filter === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(d)}
                  className={cn("capitalize", d !== "all" && {
                    easy: "text-green-700 border-green-300 hover:bg-green-50",
                    medium: "text-yellow-700 border-yellow-300 hover:bg-yellow-50",
                    hard: "text-red-700 border-red-300 hover:bg-red-50",
                  }[d])}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((problem) => (
          <Card key={problem.id} className="card-interactive">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.topic}</p>
                </div>
                <Badge variant={
                  problem.difficulty === "easy" ? "success" :
                  problem.difficulty === "medium" ? "warning" : "destructive"
                }>
                  {problem.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {problem.acceptance}% acceptance
                </span>
                <Badge variant={
                  problem.status === "solved" ? "success" :
                  problem.status === "attempted" ? "warning" : "outline"
                }>
                  {problem.status}
                </Badge>
              </div>
              <Button className="w-full" asChild>
                <a href={`/coding/${problem.id}`}>
                  {problem.status === "solved" ? "View Solution" : "Solve"}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
