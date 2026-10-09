import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Dumbbell,
  Terminal,
  ClipboardCheck,
  FolderKanban,
  RotateCcw,
  ArrowRight,
  Clock,
  Target,
  Flame,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    { label: "Current Day", value: "Day 15", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { label: "Phase", value: "Phase 2", icon: Target, color: "bg-purple-100 text-purple-600" },
    { label: "Study Streak", value: "7 days", icon: Flame, color: "bg-orange-100 text-orange-600" },
    { label: "Time This Week", value: "5h 30m", icon: Clock, color: "bg-green-100 text-green-600" },
  ];

  const learningCards = [
    {
      title: "Current Phase: Python Data Structures",
      description: "Day 15 of 25 • Lists, Tuples, Dictionaries",
      progress: 60,
      action: "Continue Learning",
      href: "/curriculum/15",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Continue Learning",
      description: "Lesson: Dictionary Methods & Operations",
      progress: 45,
      action: "Resume Lesson",
      href: "/lessons/dict-methods",
      icon: ArrowRight,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Revision Due",
      description: "3 topics need review • Loops, Functions, Conditions",
      progress: 0,
      action: "Start Revision",
      href: "/revision",
      icon: RotateCcw,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentActivity = [
    { topic: "Variables & Types", type: "Lesson", status: "completed", time: "2 hours ago" },
    { topic: "String Manipulation", type: "Practice", status: "completed", time: "5 hours ago" },
    { topic: "Control Flow Basics", type: "Quiz", status: "passed", time: "1 day ago" },
    { topic: "Functions Introduction", type: "Lesson", status: "in_progress", time: "2 days ago" },
  ];

  const quickActions = [
    { name: "Curriculum", href: "/curriculum", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { name: "Practice", href: "/practice", icon: Dumbbell, color: "bg-green-100 text-green-600" },
    { name: "Coding Lab", href: "/coding", icon: Terminal, color: "bg-purple-100 text-purple-600" },
    { name: "Assessments", href: "/assessments", icon: ClipboardCheck, color: "bg-orange-100 text-orange-600" },
    { name: "Projects", href: "/projects", icon: FolderKanban, color: "bg-pink-100 text-pink-600" },
    { name: "Revision", href: "/revision", icon: RotateCcw, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
              <p className="text-muted-foreground mt-1">
                Continue building your Data Engineering skills. You are on Day 15 of 250.
              </p>
            </div>
            <Button size="lg" className="mt-4 sm:mt-0">
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Learning Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningCards.map((card) => (
            <Card key={card.title} className="card-interactive">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", card.color + "10")}>
                    <card.icon className={cn("w-5 h-5", card.color.replace("bg-", "text-").replace("text-", "text-"))} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{card.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                    {card.progress > 0 && (
                      <div className="mt-3">
                        <Progress value={card.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{card.progress}% complete</p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <a href={card.href}>{card.action} <ArrowRight className="w-3 h-3 ml-1" /></a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="p-3 font-medium">{activity.topic}</td>
                        <td className="p-3">
                          <Badge variant="outline">{activity.type}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              activity.status === "completed" ? "success" :
                              activity.status === "passed" ? "success" :
                              activity.status === "in_progress" ? "warning" : "default"
                            }
                          >
                            {activity.status.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{activity.time}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Review</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors",
                      "group"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", action.color)}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-center">{action.name}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
