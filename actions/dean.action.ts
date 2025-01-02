"use server";
import { AddQuestionFormData } from "@/components/forms/AddReviewerQuestion";
import { AddSubtopicFormData } from "@/components/forms/AddSubtopicForm";
import { AddTopicFormData } from "@/components/forms/AddTopicForm";
import { QuestionsFormData } from "@/components/forms/QuestionsForm";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function addTopic(formvalue: AddTopicFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      program_id: Number(formvalue.program_id),
    };

    const res = await api.post(`/topic`, transformedFormValue);

    if (res.data.status === "success") {
      revalidatePath("/");
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

export async function addQuestions(formValues: QuestionsFormData) {
  try {
    // Transform and validate each question in the array
    const transformedQuestions = formValues.questions.map((question) => {
      const validChoices = question.choices.filter(
        (choice) => choice.choice_content.trim() !== ""
      );

      return {
        question_content: question.question_content,
        correct_answer: question.correct_answer,
        question_point: Number(question.question_point),
        reviewer_id: question.reviewer_id,
        choices: validChoices.map((choice) => ({
          choice_index: choice.choice_index,
          choice_content: choice.choice_content,
        })),
      };
    });

    // Send the transformed data to the API
    const res = await api.post(`/question/bulk`, {
      questions: transformedQuestions,
    });

    if (res.data.status === "success") {
      return res.data;
    } else {
      throw new Error("Failed to add questions");
    }
  } catch (error) {
    console.error("Error adding questions:", error);
    throw error; // Rethrow the error for further handling if needed
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
