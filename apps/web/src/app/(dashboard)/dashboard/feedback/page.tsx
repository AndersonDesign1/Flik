"use client";

import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FEEDBACK_TYPES = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "improvement", label: "Improvement Suggestion" },
  { value: "other", label: "Other" },
];

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="font-semibold text-foreground text-lg">Feedback</h2>
          <p className="text-muted-foreground text-sm">
            Help us improve Andy Commerce.
          </p>
        </div>

        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
            <MessageSquare className="h-8 w-8 text-success-600" />
          </div>
          <h3 className="mt-4 font-semibold text-foreground text-lg">
            Thank you for your feedback!
          </h3>
          <p className="mt-2 max-w-md text-muted-foreground text-sm">
            We appreciate you taking the time to share your thoughts. Our team
            will review your feedback and use it to improve the platform.
          </p>
          <Button
            className="mt-6"
            onClick={() => setSubmitted(false)}
            variant="outline"
          >
            Submit another
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-semibold text-foreground text-lg">Feedback</h2>
        <p className="text-muted-foreground text-sm">
          Help us improve Andy Commerce.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form className="space-y-6 p-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="type">Feedback Type</Label>
              <Select defaultValue="feature">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <input
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                id="subject"
                placeholder="Brief description of your feedback"
                required
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                id="message"
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            <div className="flex justify-end border-border/40 border-t pt-4">
              <Button className="gap-2" type="submit">
                <Send className="h-4 w-4" />
                Submit Feedback
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
