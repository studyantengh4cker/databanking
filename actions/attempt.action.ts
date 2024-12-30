"use server";

import { TestSpecificationFormData } from "@/app/(dashboard)/student/ components/Attempt/SpecificationForm";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function generateAttempt(formvalue: TestSpecificationFormData) {
  try {
    // Convert topic_id and subtopic_id to numbers
    const updatedFormValue = {
      ...formvalue,
      topic_id: formvalue.topic_id.map((id) => parseInt(id)),
      subtopic_id: formvalue.subtopic_id.map((id) => parseInt(id)),
    };

    const res = await api.post(`/generate-attempt`, updatedFormValue);

    if (res.data.status === "success") {
      revalidatePath("/");
      return res.data;
    }
  } catch (error) {
    console.error("Error generating attempt data:", error);
  }
}
