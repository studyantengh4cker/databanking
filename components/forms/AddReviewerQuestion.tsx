import { addQuestionSchema } from "@/lib/AddReviewerZodSchema";
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
  const [choices, setChoices] = useState<string[]>([]);
  const [choiceError, setChoiceError] = useState<string | null>(null);
  const [currentChoice, setCurrentChoice] = useState<string>(""); // Track the input for a single choice

  const form = useForm<AddQuestionFormData>({
    resolver: zodResolver(addQuestionSchema),
    defaultValues: {
      question: "",
      correct_answer: "",
      question_choices: [],
      question_point: "",
      topic: "",
      subtopic: "",
    },
  });

  const addChoice = () => {
    const trimmedChoice = currentChoice.trim();
    if (!trimmedChoice) {
      setChoiceError("Choice cannot be empty.");
      return;
    }
    if (choices.length >= 4) {
      setChoiceError("You can only add up to 4 choices.");
      return;
    }

    setChoices((prev) => [...prev, trimmedChoice]);
    setCurrentChoice(""); // Clear input
    setChoiceError(null); // Clear error
  };

  const onSubmit = (data: AddQuestionFormData) => {
    setLoading(true);
    const questionData = {
      ...data,
      question_choices: choices, 
    };
    console.log("Submitted data:", questionData);
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
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <FormLabel>Question Choices</FormLabel>
            <Input
              placeholder="Enter a choice"
              value={currentChoice}
              onChange={(e) => setCurrentChoice(e.target.value)}
            />
            {choiceError && (
              <p className="text-red-500 text-sm">{choiceError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={addChoice}
            disabled={!currentChoice.trim() || choices.length >= 4}
            className={`container cursor-pointer rounded-full text-white ${
              choices.length < 4
                ? "bg-[#720000] hover:bg-[#320000]"
                : "bg-gray-400"
            } flex justify-center items-center w-[40px] h-[40px]`}
          >
            +
          </button>
        </div>
        {/* Display current choices */}
        <div className="flex flex-wrap gap-4">
          {choices.map((choice, index) => (
            <div
              key={index}
              className="bg-gray-100 flex-1 px-4 py-2 rounded shadow-sm flex justify-between items-center"
            >
              <span>{choice}</span>
              <button
                type="button"
                onClick={() =>
                  setChoices((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
