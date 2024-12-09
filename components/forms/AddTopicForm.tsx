import { addTopicSchema } from "@/lib/AddReviewerZodSchema";
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
import CollegeID from "../formfields/CollegeID";
import ProgramID from "../formfields/ProgramID";
import { collegeChange } from "@/app/(custom_hooks)/useCollegeChange";
import { College, colleges } from "@/app/dashboard/colleges/Colleges";
import { addTopic } from "@/actions/dean.action";
import { toast } from "@/hooks/use-toast";

export type AddTopicFormData = z.infer<typeof addTopicSchema>;

export default function AddTopicForm() {
  const [currentCollege, setCollege] = useState<College>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<AddTopicFormData>({
    resolver: zodResolver(addTopicSchema),
    defaultValues: {
      topic_name: "",
      college_id: "",
      program_id: "",
    },
  });
  const onSubmit = async (values: AddTopicFormData) => {
    console.log('clicked')
    try {
      setLoading(true);
      const res = await addTopic(values);

      if (!res || res?.status !== "success") {
        setError(true);
      } else {
        toast({
          title: `Added ${values.topic_name} topic`,
          description: "Successfully added topic!",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err);
      setError(true);
    } finally {
      if (error) {
        toast({
          title: `Add ${values.topic_name} topic`,
          description: "Failed adding topic!",
        });
      }
      setError(false);
      setLoading(false);
    }
  };

  const handleCollegeChange = (value: string) => {
    collegeChange(form, setCollege, colleges, value);
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="topic_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Topic Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CollegeID form={form} handleCollegeChange={handleCollegeChange} />
        <ProgramID form={form} currentCollege={currentCollege} />
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
