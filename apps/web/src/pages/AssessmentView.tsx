import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, HelpCircle, Flag, Clock } from "lucide-react";
import { useState } from "react";

const assessmentData = {
  "quiz-1": {
    id: "quiz-1",
    title: "Variables & Types Quiz",
    type: "micro",
    timeLimit: 15,
    questions: [
      { id: 1, type: "multiple_choice", question: "What is the output of type(3.14)?", options: ["int", "float", "str", "bool"], correct: 1 },
      { id: 2, type: "multiple_choice", question: "Which is a valid variable name?", options: ["2name", "_name", "name-", "class"], correct: 1 },
      { id: 3, type: "output_prediction", question: "What does print(type(\"hello\")) output?", options: ["<class \"str\">", "<class \"string\">", "str", "string"], correct: 0 },
    ],
  },
};

export function AssessmentView() {
  const { assessmentId } = useParams();
  const data = assessmentData[assessmentId as keyof typeof assessmentData] || assessmentData["quiz-1"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.timeLimit * 60);

  const question = data.questions[currentQuestion];
  const isLast = currentQuestion === data.questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">85%</div>
              <Badge variant="success" className="text-lg px-4 py-2">PASSED</Badge>
              <p className="text-muted-foreground">You answered 7 out of 10 questions correctly.</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">Review Answers</Button>
                <Button>Continue Learning</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge variant="outline" className="mb-1">{data.type} quiz</Badge>
              <h1 className="text-2xl font-bold">{data.title}</h1>
            </div>
            <div className={cn("text-right", timeLeft < 60 && "text-destructive")}>
              <Clock className="w-5 h-5 inline mr-1" />
              <span className="font-mono text-lg font-medium">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
          </div>
          <Progress value={((currentQuestion + 1) / data.questions.length) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Question {currentQuestion + 1} of {data.questions.length} • {answeredCount} answered
          </p>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((opt, i) => (
                <label
                  key={i}
                  className={cn(
                    "flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer transition-colors",
                    answers[question.id] === i ? "border-primary bg-primary/5" : "hover:bg-accent"
                  )}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    checked={answers[question.id] === i}
                    onChange={() => handleAnswer(i)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="font-mono text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((prev) => prev - 1)}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <div className="flex gap-1">
          {data.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              className={cn(
                "w-8 h-8 rounded-lg border text-sm font-medium",
                i === currentQuestion ? "border-primary bg-primary text-primary-foreground" :
                answers[data.questions[i].id] !== undefined ? "border-green-500 bg-green-50 text-green-700" :
                "border-border hover:bg-accent"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <Button onClick={isLast ? handleSubmit : () => setCurrentQuestion((prev) => prev + 1)} disabled={!answers[question.id]}>
          {isLast ? "Submit Assessment" : "Next"} <ChevronRight className={cn("w-4 h-4", isLast ? "" : "ml-2")} />
        </Button>
      </div>
    </div>
  );
}
