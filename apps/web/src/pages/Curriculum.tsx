import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, Lock, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  { number: 1, title: "Python Foundations", days: "1-25", description: "Syntax, variables, data types, conditions, functions", status: "completed", progress: 100 },
  { number: 2, title: "Loops & Problem Solving", days: "26-50", description: "for, while, range, accumulators, searching, filtering", status: "in_progress", progress: 40 },
  { number: 3, title: "Python Data Structures", days: "51-75", description: "Lists, tuples, dictionaries, sets, nested structures", status: "upcoming", progress: 0 },
  { number: 4, title: "Practical Python", days: "76-100", description: "Functions in depth, modules, files, exceptions, testing", status: "upcoming", progress: 0 },
  { number: 5, title: "SQL & Relational Databases", days: "101-130", description: "Tables, keys, filtering, joins, subqueries, Postgres", status: "upcoming", progress: 0 },
  { number: 6, title: "Data Processing", days: "131-160", description: "CSV, JSON, Pandas, cleaning, validation, Parquet", status: "upcoming", progress: 0 },
  { number: 7, title: "APIs & Ingestion", days: "161-185", description: "HTTP, REST, auth, pagination, rate limits, retries", status: "upcoming", progress: 0 },
  { number: 8, title: "Data Engineering Foundations", days: "186-215", description: "ETL/ELT, pipelines, modeling, warehouses, orchestration", status: "upcoming", progress: 0 },
  { number: 9, title: "Production Tools", days: "216-240", description: "Linux, Docker, Airflow, Spark, cloud platforms", status: "upcoming", progress: 0 },
  { number: 10, title: "Production Projects & Capstone", days: "241-250", description: "End-to-end projects, deployment, evaluation", status: "upcoming", progress: 0 },
];

export function Curriculum() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Curriculum</h1>
          <p className="text-muted-foreground mt-1">
            250 days • 10 phases • Structured path to Data Engineering mastery
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Progress</Button>
          <Button>Continue Learning</Button>
        </div>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => (
          <Card key={phase.number} className="card-interactive">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg",
                  phase.status === "completed" ? "bg-green-100 text-green-700" :
                  phase.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                )}>
                  {phase.status === "completed" ? <CheckCircle className="w-6 h-6" /> : phase.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Phase {phase.number}: {phase.title}</h3>
                    <Badge variant={phase.status === "completed" ? "success" : phase.status === "in_progress" ? "default" : "outline"}>
                      {phase.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">{phase.days}</span>
                    <span className="flex items-center gap-1">{phase.progress}% complete</span>
                  </div>
                  {phase.progress > 0 && (
                    <div className="mt-2 w-1/2">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Link to={`/curriculum/${phase.number}`} className="text-primary hover:underline font-medium flex items-center gap-1">
                  View Days <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
