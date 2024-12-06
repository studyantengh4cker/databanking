import { addQuestionSchema } from "@/lib/AddReviewerZodSchema";
import { addUserSchema } from "@/lib/AddUserZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export type AddQuestionFormData = z.infer<typeof addQuestionSchema>;

export default function AddReviewerQuestion() {
  const [loading, setLoading] = useState(false);

  const form = useForm<AddQuestionFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      question: "",
      correct_answer: "",
      question_choices: "",
      question_point: "",
      topic: "",
      subtopic: "",
    },
  });
  const onSubmit = () => {
    setLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="group flex gap-4">
          <FormField
            control={form.control}
            name="correct_answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Correct Answer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question_point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Point</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Question Point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="question_choices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Choices</FormLabel>
              <FormControl>
                <Input placeholder="Enter Question Choices" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
