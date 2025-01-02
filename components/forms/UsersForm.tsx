"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as XLSX from "xlsx"; // Import the xlsx package

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
import { addUsers } from "@/actions/admin.action";

const userFormSchema = z.object({
  id: z.string().optional(),
  idnum: z.string().min(9, "Invalid ID Number"),
  first_name: z.string(),
  last_name: z.string(),
  year_level: z.number().optional(),
  college_id: z.string().optional(),
  program_id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string(),
  password_confirmation: z.string(),
  phone_number: z.string(),
  role: z.string().min(2, "Role is required"),
});

const usersFormSchema = z.object({
  users: z.array(userFormSchema),
});

export type UsersFormData = z.infer<typeof usersFormSchema>;

interface UsersFormProps {
  role: string;
}

export default function UsersForm({ role }: UsersFormProps) {
  const form = useForm<UsersFormData>({
    resolver: zodResolver(usersFormSchema),
    defaultValues: {
      users: [
        // {
        //   idnum: "",
        //   first_name: "",
        //   last_name: "",
        //   year_level: undefined,
        //   college_id: "",
        //   program_id: "",
        //   email: "",
        //   password: "",
        //   password_confirmation: "",
        //   phone_number: "",
        //   role: role || "",
        // },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  // Function to read and parse the Excel file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the data is in the first sheet
        const worksheet = workbook.Sheets[role.toUpperCase()];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map the Excel data to the expected format
        const mappedUsers = jsonData.map((item: any) => ({
          idnum: item["ID Number"] || "",
          first_name: item["First Name"] || "",
          last_name: item["Last Name"] || "",
          year_level: item["Year Level"] || undefined,
          college_id: item["College ID"] || "",
          program_id: item["Program ID"] || "",
          email: item["Email"] || "",
          password: item["Password"] || "",
          password_confirmation: item["Confirm Password"] || "",
          phone_number: item["Phone Number"] || "",
          role: role || "",
        }));

        // Append the parsed users to the form
        append(mappedUsers);
      };
      reader.readAsArrayBuffer(file);
    }
  };

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

  const handleAddUser = () => {
    append({
      idnum: "",
      first_name: "",
      last_name: "",
      year_level: undefined,
      college_id: "",
      program_id: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      role: role || "",
    });
  };

  const handleRemoveUser = (index: number) => {
    remove(index);
  };

  const handleSubmit = async (data: UsersFormData) => {
    await addUsers(data.users);
    console.log("Submitted Data:", data);
  };

  return (
    <Form {...form}>
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
            <h3>User {index + 1}</h3>

            {/* ID Number Field */}
            {isFieldVisible("idnum") && (
              <FormField
                control={form.control}
                name={`users.${index}.idnum` as const}
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
              name={`users.${index}.first_name` as const}
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
              name={`users.${index}.last_name` as const}
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
                name={`users.${index}.year_level` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Level</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year Level"
                        {...field}
                      />
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
                name={`users.${index}.college_id` as const}
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
                name={`users.${index}.program_id` as const}
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
              name={`users.${index}.email` as const}
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
              name={`users.${index}.password` as const}
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
              name={`users.${index}.password_confirmation` as const}
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
              name={`users.${index}.phone_number` as const}
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

            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveUser(index)}
            >
              Remove User
            </Button>
          </div>
        ))}

        <Button type="button" onClick={handleAddUser}>
          Add New User
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
