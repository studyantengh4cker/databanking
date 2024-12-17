"use server";
import { AddQuestionFormData } from "@/components/forms/AddReviewerQuestion";
import { AddSubtopicFormData } from "@/components/forms/AddSubtopicForm";
import { AddTopicFormData } from "@/components/forms/AddTopicForm";
import api from "@/lib/api";

export async function addTopic(formvalue: AddTopicFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
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
      topic_id: Number(formvalue.topic_id),
    };
    const res = await api.post(`/subtopic`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding subtopic data:", error);
  }
}

export async function addQuestion(formvalue: AddQuestionFormData) {
  try {
    const transformedFormValue = {
      question_content: formvalue.question_content,
      correct_answer: formvalue.correct_answer,
      question_point: Number(formvalue.question_point),
      subtopic_id: Number(formvalue.subtopic_id),
      choices: Object.entries(formvalue.question_choices).map(([index, content]) => ({
        choice_index: index.toUpperCase(),
        choice_content: content,
      })),
    };

    const res = await api.post(`/question`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding question data:", error);
  }
}

