"use server";

import { TestSpecificationFormData } from "@/app/(dashboard)/student/ components/Attempt/SpecificationForm";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function generateAttempt(formvalue: TestSpecificationFormData) {
  try {
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

export async function getAttemptQuestions(attempt_id: string) {
  try {
    const res = await api.get(
      `/attempt-questions?attempt_id=${parseInt(attempt_id)}`
    );

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching attempt questions:", error);
  }
}

export async function submitQuestionAnswer(question_id: string, answer: string) {
  try {
    const res = await api.post(
      `/submit-answer?reviewer_attempt_question_id=${question_id}&answer=${answer}`
    );

    if (res.data.status === "success") {
      revalidatePath('/')
      return res.data.data;
    }
  } catch (error) {
    console.error("Error submitting attempt question answer:", error);
  }
}
