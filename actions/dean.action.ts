"use server";
import { AddSubtopicFormData } from "@/components/forms/AddSubtopicForm";
import { AddTopicFormData } from "@/components/forms/AddTopicForm";
import api from "@/lib/api";

export async function addTopic(formvalue: AddTopicFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      college_id: Number(formvalue.college_id),
      program_id: Number(formvalue.program_id),
    };

    const res = await api.post(`/topic`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding topic data:", error);
  }
}

export async function addSubtopic(formvalue: AddSubtopicFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      topic_id: Number(formvalue.college_id),
      college_id: Number(formvalue.college_id),
      program_id: Number(formvalue.program_id),
    };
    const res = await api.post(`/subtopic`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding subtopic data:", error);
  }
}
