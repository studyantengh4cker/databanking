"use client";

import { z } from "zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import * as XLSX from "xlsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { addQuestions } from "@/actions/dean.action";

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

const questionsFormSchema = z.object({
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
      questions: [
        // {
        //   question_content: "",
        //   correct_answer: "",
        //   reviewer_id,
        //   question_point: 1,
        //   choices: [
        //     { choice_index: "A", choice_content: "" },
        //     { choice_index: "B", choice_content: "" },
        //     { choice_index: "C", choice_content: "" },
        //     { choice_index: "D", choice_content: "" },
        //   ],
        // },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets["QUESTIONS"]; // Use the first sheet
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

        // Append the parsed questions to the form
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
        <div>
          <label
            htmlFor="file-upload"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Upload Excel File
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded-md">
            <h3>Question {index + 1}</h3>

            <FormField
              control={form.control}
              name={`questions.${index}.question_content` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`questions.${index}.correct_answer` as const}
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
              name={`questions.${index}.question_point` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Point</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Question Point"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {field.choices.map((choice, choiceIndex) => (
                <FormField
                  key={choice.choice_index}
                  control={form.control}
                  name={
                    `questions.${index}.choices.${choiceIndex}.choice_content` as const
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choice {choice.choice_index}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Choice ${choice.choice_index}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove Question
            </Button>
          </div>
        ))}

        <Button type="button" onClick={handleAddQuestion}>
          Add New Question
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
