"use server";

import { LoginFormData } from "@/components/forms/LoginForm";
import api from "@/lib/api";
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

export async function getUserByID(id: number) {
  try {
    const res = await api.get(`/user/${id}`);
    if (res.data.status === "success") {
      return res.data.data.users;
    }
  } catch (error) {
    console.error("Error in fetching user data, ", error);
  }
}
