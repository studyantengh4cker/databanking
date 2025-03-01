import { addTopicSchema } from "@/lib/ZodSchemas/AddReviewerZodSchema";
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
import { colleges } from "@/app/dashboard/colleges/Colleges";
import { addTopic } from "@/actions/dean.action";
import { toast } from "@/hooks/use-toast";
import { useFormfieldCollegeContext } from "@/context/form_field/CollegeContext";
import { Reviewer } from "@/lib/types";

export type AddTopicFormData = z.infer<typeof addTopicSchema>;

interface AddTopicFormProps {
  reviewer: Reviewer
}

export default function AddTopicForm({reviewer}: AddTopicFormProps) {
  // const [currentCollege, setCollege] = useState<College>();
  const {setCurrentCollege} = useFormfieldCollegeContext()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  const form = useForm<AddTopicFormData>({
    resolver: zodResolver(addTopicSchema),
    defaultValues: {
      topic_name: "",
      topic_description: "",
      reviewer_id: reviewer.id,
      program_id: "",
    },
  });
  const onSubmit = async (values: AddTopicFormData) => {
    try {
      setLoading(true);
      const res = await addTopic(values);
      console.log(values.program_id)
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
    collegeChange(form, setCurrentCollege, colleges, value);
  };
  if(!reviewer){
    return null
  }
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
        <FormField
          control={form.control}
          name="topic_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Topic Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CollegeID form={form} handleCollegeChange={handleCollegeChange} />
        <ProgramID form={form} />
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
