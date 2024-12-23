import { Input } from "@/components/ui/input";
import { colleges } from "@/app/dashboard/colleges/Colleges";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { collegeChange } from "@/app/(custom_hooks)/useCollegeChange";
import { useSubmitAddUserForm } from "@/app/(custom_hooks)/useSubmitAddUserForm";
import { addUserSchema } from "@/lib/ZodSchemas/AddUserZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { AddUserFormData } from "./AddDeanForm";
import CollegeID from "../formfields/CollegeID";
import ProgramID from "../formfields/ProgramID";
import { useFormfieldCollegeContext } from "@/context/form_field/CollegeContext";

export default function AddStudentForm() {
  const {setCurrentCollege} = useFormfieldCollegeContext()
  const { onSubmit, loading } = useSubmitAddUserForm();

  const form = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      idnum: "",
      first_name: "",
      last_name: "",
      email: "",
      role: "student",
      year_level: null,
      college_id: "",
      program_id: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
    },
  });

  const handleCollegeChange = (value: string) => {
    collegeChange(form, setCurrentCollege, colleges, value);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="input-group flex gap-5">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idnum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter ID number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="input-group flex gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="input-group flex gap-5">
          {" "}
          <CollegeID form={form} handleCollegeChange={handleCollegeChange} />
          <ProgramID form={form}  />
        </div>
        <div className="input-group flex gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-[30%]" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
