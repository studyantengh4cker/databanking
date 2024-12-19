"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const userFormSchema = z.object({
  id: z.string().optional(), // id is optional for creating a new account
  idnum: z.string().min(9, "Invalid ID Number"),
  first_name: z.string(),
  last_name: z.string(),
  year_level: z.number().optional(),
  college_id: z.string().optional(),
  program_id: z.string().optional(),
  email: z.string().min(2, "Email is required").max(50, "Email is too long"),
  password: z.string(),
  password_confirmation: z.string(),
  phone_number: z.string(),
  role: z.string().min(2, "Role is required"),
});

interface UserFormProps {
  defaultValues?: z.infer<typeof userFormSchema>; // For editing, pass in default values
  role?: string;
}

export type UserFormData = z.infer<typeof userFormSchema>;

export default function UserForm({ defaultValues, role }: UserFormProps) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      email: "",
      role: role || "",
      idnum: "",
      first_name: "",
      last_name: "",
      year_level: 0,
      college_id: "",
      program_id: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
    },
  });

  function isFieldVisible(field: string): boolean {
    if (
      role === "admin" &&
      ["year_level", "college_id", "program_id"].includes(field)
    ) {
      return false;
    }
    if ((role === "faculty" || role === "dean") && field === "year_level") {
      return false;
    }
    return true;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => console.log(values))}
        className="space-y-8"
      >
        {/* ID Number Field */}
        {isFieldVisible("idnum") && (
          <FormField
            control={form.control}
            name="idnum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="ID Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* First Name Field */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year Level Field */}
        {isFieldVisible("year_level") && (
          <FormField
            control={form.control}
            name="year_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Level</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Year Level" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* College ID Field */}
        {isFieldVisible("college_id") && (
          <FormField
            control={form.control}
            name="college_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College ID</FormLabel>
                <FormControl>
                  <Input placeholder="College ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Program ID Field */}
        {isFieldVisible("program_id") && (
          <FormField
            control={form.control}
            name="program_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program ID</FormLabel>
                <FormControl>
                  <Input placeholder="Program ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Confirmation Field */}
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
