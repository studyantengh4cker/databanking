import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { College, colleges, Programs } from "@/app/dashboard/colleges/Colleges";
import { Button } from "../ui/button";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDeanorProgramHead } from "@/actions/admin.action";
import { error } from "console";
import { toast } from "@/hooks/use-toast";

export const addUserSchema = z
  .object({
    idnum: z.string().nonempty("ID number is required"),

    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(255),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(255),
    email: z.string().email("Invalid email address"),
    role: z.string().nonempty("Role is required"),
    year_level: z.string().max(4).nullable(),
    college_id: z.string().nonempty("College is required"),

    program_id: z.string().nonempty("Program is required"),

    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["password_confirmation"],
      });
    }
  });

export type AddDeanFormData = z.infer<typeof addUserSchema>;

export default function AddDeanForm() {
  const [currentCollege, setCollege] = useState<College>();
  const [currentProgram, setProgram] = useState<Programs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<AddDeanFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      idnum: "",
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      year_level: null,
      college_id: "",
      program_id: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
    },
  });

  async function onSubmit(values: AddDeanFormData) {
    try {
      setLoading(true);
      const res = await addDeanorProgramHead(values);
      if (res && res?.status !== "success") {
        console.log("RES: ", res);
        setError(true);
      }
      console.log(values);
    } catch (error) {
      alert(error);
      setError(true);
    } finally {
      if (!error) {
        toast({
          title: `Add ${values.role} Account`,
          description: "Successfuly added account!",
        });
        // router.push("/dashboard");
      } else {
        toast({
          title: `Add ${values.role} Account`,
          description: "Failed adding account!",
        });
      }
      setError(false);
      setLoading(false);
    }
  }

  const handleCollegeChange = (value: string) => {
    const selected = colleges.find((c) => c.id === value);
    setCollege(selected);

    form.setValue("college_id", value);

    form.setValue("program_id", "");
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dean">Dean</SelectItem>
                    <SelectItem value="programhead">Program Head</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="input-group flex gap-5">
          {" "}
          <FormField
            control={form.control}
            name="college_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select
                  onValueChange={(value) => handleCollegeChange(value)}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem
                        key={college.id}
                        value={college.id.toString()}
                      >
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCollege ? (
                      currentCollege.programs.length > 0 ? (
                        currentCollege.programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="1">No programs</SelectItem>
                      )
                    ) : (
                      <SelectItem value="empty">No College</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
