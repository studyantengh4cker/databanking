import { Input } from "@/components/ui/input";
import { colleges } from "@/app/dashboard/colleges/Colleges";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { addReviewerSchema } from "@/lib/ZodSchemas/AddReviewerZodSchema";
import CollegeID from "../formfields/CollegeID";
import { collegeChange } from "@/app/(custom_hooks)/useCollegeChange";
import ProgramID from "../formfields/ProgramID";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useSubmitAddReviewerForm } from "@/app/(custom_hooks)/useSubmitAddReviewer";
import { useFormfieldCollegeContext } from "@/context/form_field/CollegeContext";

export type AddReviewerFormData = z.infer<typeof addReviewerSchema>;

export default function AddReviewerForm() {
  const form = useForm<AddReviewerFormData>({
    resolver: zodResolver(addReviewerSchema),
    defaultValues: {
      reviewer_name: "",
      reviewer_description: "",
      school_year: "",
      college_id: "",
      program_id: "",
    },
  });
  const {setCurrentCollege} = useFormfieldCollegeContext()
  const { onSubmit, loading } = useSubmitAddReviewerForm();

  const handleCollegeChange = (value: string) => {
    collegeChange(form, setCurrentCollege, colleges, value);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col h-full w-full items-start justify-start"
      >
        <div className="reviewer-info flex gap-4">
          <FormField
            control={form.control}
            name="reviewer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reviewer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reviewer_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reviewer description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Year</FormLabel>
                <FormControl>
                  <Input placeholder="Enter school year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="college w-full flex gap-5">
          <CollegeID form={form} handleCollegeChange={handleCollegeChange} />
          <ProgramID form={form} />
        </div>
        <div className="button w-full h-1/4 flex items-end">
          <Button className="w-[30%]" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
