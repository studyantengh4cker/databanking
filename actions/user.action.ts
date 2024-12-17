"use server";

import { LoginFormData } from "@/components/forms/LoginForm";
import { signIn } from "@/lib/auth";

export async function login(data: LoginFormData) {
  try {
    await signIn("credentials", { redirect: false, ...data });
    return { success: true, message: "Logged In" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Incorrect Email or Password" };
  }
}


