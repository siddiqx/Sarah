import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, PlayCircle, Code, Copy, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const lessonData = {
  "dict-update-pop": {
    id: "dict-update-pop",
    topicId: "dict-methods",
    title: "update() and pop() Methods",
    description: "Learn to merge dictionaries and remove items safely.",
    blocks: [
      {
        type: "concept",
        title: "Merging Dictionaries with update()",
        content: {
          explanation: "The update() method merges another dictionary into the current one, overwriting existing keys.",
          code: "user = {\"name\": \"Alice\", \"age\": 25}\nupdates = {\"age\": 26, \"city\": \"NYC\"}\nuser.update(updates)\n# {\"name\": \"Alice\", \"age\": 26, \"city\": \"NYC\"}",
        },
      },
      {
        type: "worked_example",
        title: "Practical Example: Config Merging",
        content: {
          scenario: "Merging default config with user config",
          code: "DEFAULT_CONFIG = {\n  \"theme\": \"light\",\n  \"lang\": \"en\",\n  \"notifications\": True\n}\n\nuser_config = {\"theme\": \"dark\"}\nconfig = DEFAULT_CONFIG.copy()\nconfig.update(user_config)\n# {\"theme\": \"dark\", \"lang\": \"en\", \"notifications\": True}",
        },
      },
      {
        type: "prediction",
        title: "Predict the Output",
        content: {
          code: "a = {\"x\": 1, \"y\": 2}\nb = {\"y\": 3, \"z\": 4}\na.update(b)\nprint(a)",
          question: "What will be printed?",
          options: [
            "{\"x\": 1, \"y\": 2, \"z\": 4}",
            "{\"x\": 1, \"y\": 3, \"z\": 4}",
            "{\"y\": 3, \"z\": 4}",
            "Error",
          ],
          correct: 1,
          explanation: "update() overwrites existing keys. Key \"y\" changes from 2 to 3.",
        },
      },
      {
        type: "fill_code",
        title: "Complete the Code",
        content: {
          prompt: "Remove \"age\" from the dictionary and store its value.",
          starter: "user = {\"name\": \"Bob\", \"age\": 30, \"city\": \"LA\"}\n# Remove age and get its value\nage = user._____(_____)\nprint(age)  # Should print 30\nprint(user)  # Should not have \"age\"",
          solution: "user.pop(\"age\")",
          hint: "Use pop(key) to remove and return a value.",
        },
      },
    ],
  },
};

export function LessonView() {
  const { lessonId } = useParams();
  const data = lessonData[lessonId as keyof typeof lessonData] || lessonData["dict-update-pop"];
  const [currentBlock, setCurrentBlock] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);

  const block = data.blocks[currentBlock];
  const isLast = currentBlock === data.blocks.length - 1;
  const isFirst = currentBlock === 0;

  const handleComplete = () => {
    if (!completedBlocks.includes(currentBlock)) {
      setCompletedBlocks((prev) => [...prev, currentBlock]);
    }
    if (!isLast) setCurrentBlock((prev) => prev + 1);
  };

  const renderBlock = () => {
    switch (block.type) {
      case "concept":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">{block.title}</h3>
            <p className="text-muted-foreground">{block.content.explanation}</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {block.content.code}
            </div>
          </div>
        );
      case "worked_example":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">{block.title}</h3>
            <p className="text-muted-foreground">{block.content.scenario}</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {block.content.code}
            </div>
          </div>
        );
      case "prediction":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">{block.title}</h3>
            <p className="text-muted-foreground">{block.content.question}</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
              {block.content.code}
            </div>
            <div className="space-y-2">
              {block.content.options?.map((opt, i) => (
                <label key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent">
                  <input type="radio" name="prediction" className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case "fill_code":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">{block.title}</h3>
            <p className="text-muted-foreground">{block.content.prompt}</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {block.content.starter}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your answer:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-input bg-background rounded-md font-mono text-sm"
                placeholder={block.content.hint}
              />
            </div>
          </div>
        );
      default:
        return <div>Block type: {block.type}</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="outline" className="mb-2">{data.topicId}</Badge>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" /> Copy Code
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Block {currentBlock + 1} of {data.blocks.length}</span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentBlock + 1) / data.blocks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson Content */}
      <Card>
        <CardContent className="pt-6 pb-6">
          {renderBlock()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={isFirst}
          onClick={() => setCurrentBlock((prev) => prev - 1)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button onClick={handleComplete} disabled={completedBlocks.includes(currentBlock)}>
          {isLast ? (
            <>
              Complete Lesson <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Next Block <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Block Navigator */}
      <div className="flex gap-2 flex-wrap">
        {data.blocks.map((b, i) => (
          <button
            key={i}
            onClick={() => setCurrentBlock(i)}
            className={cn(
              "w-8 h-8 rounded-lg border font-medium text-sm transition-colors",
              i === currentBlock ? "border-primary bg-primary text-primary-foreground" :
              completedBlocks.includes(i) ? "border-green-500 bg-green-50 text-green-700" :
              "border-border hover:bg-accent"
            )}
            aria-label={`Block ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
