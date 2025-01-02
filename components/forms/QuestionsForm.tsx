"use client";

import { z } from "zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import * as XLSX from "xlsx";

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
        <div>
          <label
            htmlFor="file-upload"
            className="block mb-2 text-sm font-medium"
          >
            Upload Excel File
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block w-full text-sm border rounded-lg"
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 border p-4 rounded-md">
            <h3>Question {index + 1}</h3>
            {/* Form Fields */}
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
