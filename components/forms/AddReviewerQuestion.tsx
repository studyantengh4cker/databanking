import { addQuestionSchema } from "@/lib/ZodSchemas/AddReviewerZodSchema";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { addQuestion, editQuestion } from "@/actions/dean.action";
import { toast } from "@/hooks/use-toast";
import { Question, Reviewer } from "@/lib/types";
import TopicID from "../formfields/TopicID";
import SubtopicID from "../formfields/SubtopicID";

export type AddQuestionFormData = z.infer<typeof addQuestionSchema>;

interface AddReviewerQuestionProps {
  reviewer: Reviewer;
  defaultValues: Question | undefined;
}

export default function AddReviewerQuestion({
  reviewer,
  defaultValues,
}: AddReviewerQuestionProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentChoice, setCurrentChoice] = useState("");
  const [choices, setChoices] = useState<any>();

  const form = useForm<AddQuestionFormData>({
    defaultValues: {
      topic_id: null,
      subtopic_id: null,
      reviewer_id: reviewer.id,
      question_content: defaultValues?.question_content || "",
      correct_answer: defaultValues?.correct_answer || "",
      question_point: defaultValues?.question_point || "",
      choices: defaultValues?.choices?.map((choice) => ({
        choice_index: choice.choice_index as "A" | "B" | "C" | "D",
        choice_content: choice.choice_content,
      })) || [
        { choice_index: "A", choice_content: "" },
        { choice_index: "B", choice_content: "" },
        { choice_index: "C", choice_content: "" },
        { choice_index: "D", choice_content: "" },
      ],
    },
  });

  const addChoice = () => {
    const trimmedChoice = currentChoice.trim();
    if (!trimmedChoice) {
      toast({
        title: "Error",
        description: "Choice cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const choices = form.getValues().choices;
    const emptyChoiceIndex = choices.findIndex(
      (choice) => !choice.choice_content
    );
    if (emptyChoiceIndex === -1) {
      toast({
        title: "Error",
        description: "Maximum 4 choices allowed",
        variant: "destructive",
      });
      return;
    }

    const updatedChoices = [...choices];
    updatedChoices[emptyChoiceIndex].choice_content = trimmedChoice;

    form.setValue("choices", updatedChoices);
    setCurrentChoice("");
  };

  const removeChoice = (choiceIndex: "A" | "B" | "C" | "D") => {
    const updatedChoices = form
      .getValues()
      .choices.map((choice) =>
        choice.choice_index === choiceIndex
          ? { ...choice, choice_content: "" }
          : choice
      );
    setChoices(updatedChoices);
  };

  useEffect(() => {
    if (choices) {
      form.setValue("choices", choices);
    }
  }, [form, choices]);

  const isEditing = defaultValues?.question_content?.trim() !== undefined;
  const onSubmit = async (values: AddQuestionFormData) => {
    try {
      setLoading(true);

      const res = isEditing
        ? await editQuestion(values, defaultValues?.id || 0)
        : await addQuestion(values);

      if (!res || res?.status !== "success") {
        throw new Error(
          isEditing ? "Failed to edit question" : "Failed to add question"
        );
      }

      toast({
        title: "Success",
        description: isEditing
          ? `Edited question: "${values.question_content}"`
          : `Added question: "${values.question_content}"`,
      });

      if (!isEditing) {
        form.reset();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : isEditing
            ? "Failed to edit question"
            : "Failed to add question",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-400 rounded-md px-10 py-3 text-white">
          {error.message}
        </div>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="topic-subtopic flex gap-5">
            <div className="topic flex-1">{defaultValues && <TopicID reviewer_id={reviewer.id} form={form} />}</div>
            <div className="subtopic flex-1">{defaultValues && (
              <SubtopicID
                topic_id={form.getValues().topic_id || 0}
                form={form}
              />
            )}</div>
          </div>
          <FormField
            control={form.control}
            name="reviewer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer ID</FormLabel>
                <FormControl>
                  <Input {...field} value={reviewer.id} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="question_content"
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

          <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Button
              type="button"
              onClick={addChoice}
              className="h-10 w-10 rounded-full"
              variant="default"
              disabled={
                !currentChoice.trim() ||
                form
                  .getValues()
                  .choices.every((choice) => choice.choice_content)
              }
            >
              +
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {form.getValues().choices.map((choice) =>
              choice.choice_content !== "" ? (
                <div
                  key={choice.choice_index}
                  className="bg-gray-100 px-4 py-2 rounded shadow-sm flex justify-between items-center"
                >
                  <p className="flex justify-between w-full items-center">
                    <span>
                      <strong>{choice.choice_index}:</strong>{" "}
                      {choice.choice_content}
                    </span>{" "}
                    <span
                      className=" text-red-400 rounded-md p-2 cursor-pointer"
                      onClick={() => removeChoice(choice.choice_index)}
                    >
                      Remove
                    </span>
                  </p>
                </div>
              ) : null
            )}
          </div>

          <Button
            className="w-full md:w-[30%]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
