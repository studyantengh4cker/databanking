import { z } from "zod";

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