"use server";

import { AddUserFormData } from "@/components/forms/AddDeanForm";
import { AddReviewerFormData } from "@/components/forms/AddReviewerForm";
import api from "@/lib/api";

export async function addDeanorProgramHead(formvalue: AddUserFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      idnum: Number(formvalue.idnum),
      college_id: Number(formvalue.college_id),
      program_id: Number(formvalue.program_id),
      year_level: Number(formvalue.year_level),
    };

    const res = await api.post(`/user`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching college users:", error);
  }
}

export async function addReviewer(formvalue: AddReviewerFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      college_id: Number(formvalue.college_id),
      program_id: Number(formvalue.program_id),
      school_year: Number(formvalue.school_year),
    };
    const res = await api.post(`/reviewer`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching college users:", error);
  }
}