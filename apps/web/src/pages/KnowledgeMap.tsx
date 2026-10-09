import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, CheckCircle, Target } from "lucide-react";

export function KnowledgeMap() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Map</h1>
        <p className="text-muted-foreground">Visualize your learning dependencies and progress</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground py-12">Knowledge Map visualization coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
