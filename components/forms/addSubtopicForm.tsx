import { addSubTopicSchema } from "@/lib/AddReviewerZodSchema";
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
import { addSubtopic } from "@/actions/dean.action";
import { toast } from "@/hooks/use-toast";
import TopicID from "../formfields/TopicID";

export type AddSubtopicFormData = z.infer<typeof addSubTopicSchema>;

export default function AddSubtopicForm() {
  // const [currentCollege, setCollege] = useState<College>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<AddSubtopicFormData>({
    resolver: zodResolver(addSubTopicSchema),
    defaultValues: {
      subtopic_name: "",
      subtopic_description: "",
      topic_id: "",
    },
  });
  const onSubmit = async (values: AddSubtopicFormData) => {
    try {
      setLoading(true);
      const res = await addSubtopic(values);

      if (!res || res?.status !== "success") {
        setError(true);
      } else {
        toast({
          title: `Added ${values.subtopic_name} subtopic`,
          description: "Successfully added subtopic!",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err);
      setError(true);
    } finally {
      if (error) {
        toast({
          title: `Add ${values.subtopic_name} subtopic`,
          description: "Failed adding sibtopic!",
        });
      }
      setError(false);
      setLoading(false);
    }
  };
  // const handleCollegeChange = (value: string) => {
  //   collegeChange(form, setCollege, colleges, value);
  // };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="subtopic_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtopic Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Subtopic Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtopic_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtopic Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Subtopic Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <TopicID form={form} />
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
