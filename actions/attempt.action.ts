"use server";

import { TestSpecificationFormData } from "@/app/(dashboard)/student/ components/Attempt/SpecificationForm";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function generateAttempt(formvalue: TestSpecificationFormData) {
  try {
    
    const updatedFormValue = {
      ...formvalue,
      topic_ids: formvalue.topic_ids.map((id) => {return Number(id)}),
      subtopic_ids: formvalue.subtopic_ids.map((id) => {return Number(id)}),
    };
    console.log('updated form value',updatedFormValue);
    const res = await api.post(`/generate-attempt`, updatedFormValue);

    if (res.data.status === "success") {
      
      return res.data;
    }
  } catch (error) {
    console.error("Error generating attempt data:", error);
  }
}

export async function getAttempt(attempt_id: string) {
  try {
    const res = await api.get(`/get-attempt?attempt_id=${attempt_id}`);

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching attempt:", error);
  }
}
export async function getAttemptQuestions(attempt_id: string) {
  try {
    const res = await api.get(`/attempt-questions?attempt_id=${attempt_id}`);

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching attempt questions:", error);
  }
}

export async function submitQuestionAnswer(
  question_id: string,
  answer: string | null
) {
  try {
    const res = await api.post(
      `/submit-answer?reviewer_attempt_question_id=${question_id}&answer=${
        answer ? answer : null
      }`
    );

    if (res.data.status === "success") {
      revalidatePath("/");
      return res.data.data;
    }
  } catch (error) {
    console.error("Error submitting attempt question answer:", error);
  }
}
export async function resetQuestionAnswer(question_id: string) {
  try {
    const res = await api.post(
      `/reset-answer?reviewer_attempt_question_id=${question_id}`
    );

    if (res.data.status === "success") {
      revalidatePath("/");
      return res.data.data;
    }
  } catch (error) {
    console.error("Error submitting attempt question answer:", error);
  }
}

export async function flagQuestion(
  reviewer_attempt_question_id: string,
  is_flagged: boolean
) {
  try {
    const flag: number = is_flagged ? 1 : 0;
    const res = await api.put(
      `/set-flag?reviewer_attempt_question_id=${reviewer_attempt_question_id}&is_flagged=${flag}`
    );

    if (res.data.status === "success") {
      revalidatePath("/");
      return res.data.data;
    }
  } catch (error) {
    console.error("Error flagging attempt question:", error);
  }
}

export async function submitAttempt(attempt_id: number) {
  try {
    const res = await api.post(`/submit-attempt/${attempt_id}`);
    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error submitting attempt:", error);
  }
}

export async function viewResult(attempt_id: number) {
  try {
    const res = await api.get(`/view-result?attempt_id=${attempt_id}`);
    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error retreiving attempt result:", error);
  }
}

export async function getAttemptHistory(){
  try{
    const res = await api.get(`/get-attempts`)
    if (res.data.status === "success") {
      return res.data.data;
    }
  }catch(error){
    console.error("Error in retreiving attempts", error)
  }
}

export async function getUserAttemptHistory(user_id: number){
  try{
    const res = await api.get(`/get-attempts?user_id=${user_id}`)
    if (res.data.status === "success") {
      return res.data.data;
    }
  }catch(error){
    console.error("Error in retreiving attempts", error)
  }
}