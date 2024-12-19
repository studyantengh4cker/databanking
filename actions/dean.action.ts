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
    const validChoices = formvalue.choices.filter(
      (choice) => choice.choice_content.trim() !== ""
    );
    const transformedFormValue = {
      ...formvalue,
      question_point: Number(formvalue.question_point),
      choices: validChoices.map((choice) => ({
        choice_index: choice.choice_index,
        choice_content: choice.choice_content,
      })),
    };

    const questions = [transformedFormValue];

    const res = await api.post(`/question`, { questions });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding question data:", error);
  }
}
export async function editQuestion(formvalue: AddQuestionFormData, id: number) {
  try {
    const validChoices = formvalue.choices.filter(
      (choice) => choice.choice_content.trim() !== ""
    );
    const transformedFormValue = {
      ...formvalue,
      question_point: Number(formvalue.question_point),
      choices: validChoices.map((choice) => ({
        choice_index: choice.choice_index,
        choice_content: choice.choice_content,
      })),
    };

    const res = await api.put(`/question/${id}`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding question data:", error);
  }
}
