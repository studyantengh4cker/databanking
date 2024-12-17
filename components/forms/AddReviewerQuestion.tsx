import { addQuestionSchema } from "@/lib/AddReviewerZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {  useState } from "react";
import { Button } from "../ui/button";

import SubtopicID from "../formfields/SubtopicID";
import { addQuestion } from "@/actions/dean.action";
import { toast } from "@/hooks/use-toast";

export type AddQuestionFormData = z.infer<typeof addQuestionSchema>;
export type ChoiceKey = "a" | "b" | "c" | "d";

export default function AddReviewerQuestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<string>("");
  const [choiceKey, setChoiceKey] = useState<ChoiceKey>("a");

  const form = useForm<AddQuestionFormData>({
    resolver: zodResolver(addQuestionSchema),
    defaultValues: {
      question_content: "",
      correct_answer: "",
      question_point: "",
      subtopic_id: "",
      question_choices: { a: "", b: "", c: "", d: "" },
    },
  });

  const addChoice = () => {
    const trimmedChoice = currentChoice.trim();
    if (!trimmedChoice) {
      alert("Choice cannot be empty.");
      return;
    }

    const updatedChoices = { ...form.getValues().question_choices };
    updatedChoices[choiceKey] = trimmedChoice;

    form.setValue("question_choices", updatedChoices);
    setCurrentChoice("");
    setChoiceKey(nextChoiceKey(choiceKey));
  };

  const nextChoiceKey = (key: ChoiceKey): ChoiceKey => {
    const keys: ChoiceKey[] = ["a", "b", "c", "d"];
    const currentIndex = keys.indexOf(key);

    return keys[Math.min(currentIndex + 1, keys.length - 1)];
  };

  const onSubmit = async (values: AddQuestionFormData) => {
    try {
      setLoading(true);

      const res = await addQuestion(values);

      if (!res || res?.status !== "success") {
        setError(true);
      } else {
        toast({
          title: `Added ${values.question_content} question`,
          description: "Successfully added question!",
        });
      }
    } catch (err) {
      console.error(err);
      setError(true);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  if(error){
    return <div>ERROR</div>
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SubtopicID form={form} />
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
          </div>
          <button
            type="button"
            onClick={addChoice}
            className="container cursor-pointer rounded-full text-white bg-[#720000] hover:bg-[#320000] flex justify-center items-center w-[40px] h-[40px]"
            disabled={
              !currentChoice.trim() ||
              Object.values(form.getValues().question_choices).filter(Boolean)
                .length >= 4
            }
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(form.getValues().question_choices).map(
            ([key, value]) =>
              value ? (
                <div
                  key={key}
                  className="bg-gray-100 flex-1 px-4 py-2 rounded shadow-sm flex justify-between items-center"
                >
                  <span>
                    <strong>{key.toUpperCase()}:</strong> {value}
                  </span>
                </div>
              ) : null
          )}
        </div>
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
