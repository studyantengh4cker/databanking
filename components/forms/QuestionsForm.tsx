"use client";

import { z } from "zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import * as XLSX from "xlsx";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";
import { addQuestions } from "@/actions/dean.action";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const questionSchema = z.object({
  question_content: z.string().min(1, "Question content is required"),
  correct_answer: z.string().min(1, "Correct answer is required"),
  question_point: z.number().min(1, "Question point is required"),
  reviewer_id: z.number(),
  choices: z
    .array(
      z.object({
        choice_index: z.string(),
        choice_content: z.string().min(1, "Choice content is required"),
      })
    )
    .length(4, "Exactly 4 choices are required"),
});

export const questionsFormSchema = z.object({
  questions: z.array(questionSchema),
});

export type QuestionsFormData = z.infer<typeof questionsFormSchema>;

export default function QuestionsForm({
  reviewer_id,
}: {
  reviewer_id: number;
}) {
  const form = useForm<QuestionsFormData>({
    defaultValues: {
      questions: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({
      question_content: "",
      correct_answer: "",
      reviewer_id,
      question_point: 1,
      choices: [
        { choice_index: "A", choice_content: "" },
        { choice_index: "B", choice_content: "" },
        { choice_index: "C", choice_content: "" },
        { choice_index: "D", choice_content: "" },
      ],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets["QUESTIONS"];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const mappedQuestions = jsonData.map((item: any) => ({
          question_content: item["Question"] || "",
          correct_answer: item["Correct Answer"] || "",
          question_point: Number(item["Points"]) || 1,
          reviewer_id: reviewer_id,
          choices: [
            { choice_index: "A", choice_content: item["A"] || "" },
            { choice_index: "B", choice_content: item["B"] || "" },
            { choice_index: "C", choice_content: item["C"] || "" },
            { choice_index: "D", choice_content: item["D"] || "" },
          ],
        }));

        append(mappedQuestions);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (data: QuestionsFormData) => {
    console.log("Submitted Data:", data);
    await addQuestions(data);
    toast({
      title: "Success",
      description: "Questions submitted successfully",
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* File Upload Section */}
        <div>
          <Label htmlFor="file-upload" className="block text-sm font-medium">
            Upload Excel File
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block w-full text-sm border rounded-lg"
          />
        </div>

        {/* Questions Form Fields */}
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-semibold">Question {index + 1}</h3>

            {/* Question Content */}
            <FormField
              control={form.control}
              name={`questions.${index}.question_content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Content</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the question"
                      className="block w-full text-sm border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Correct Answer */}
            <FormField
              control={form.control}
              name={`questions.${index}.correct_answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter correct answer"
                      className="block w-full text-sm border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Question Points */}
            <FormField
              control={form.control}
              name={`questions.${index}.question_point`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Points</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter points"
                      className="block w-full text-sm border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Choices */}
            <div className="space-y-2">
              {field.choices.map((choice, choiceIndex) => (
                <FormField
                  key={choiceIndex}
                  control={form.control}
                  name={`questions.${index}.choices.${choiceIndex}.choice_content`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{choice.choice_index}. Choice Content</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Choice ${choice.choice_index}`}
                          className="block w-full text-sm border rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Add New Question Button */}
        <Button type="button" onClick={handleAddQuestion} variant="outline">
          Add New Question
        </Button>

        {/* Submit Button */}
        <Button type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
