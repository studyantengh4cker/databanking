"use server";

import { AddUserFormData } from "@/components/forms/AddDeanForm";
import { AddReviewerFormData } from "@/components/forms/AddReviewerForm";
import { UserFormData } from "@/components/forms/UserForm";
import api from "@/lib/api";

export async function addUser(data: UserFormData) {
  try {
  } catch (error) {
    console.log(error);
  }
}

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
    console.error("Error adding dean or programhead:", error);
  }
}

export async function addUsers(users: UserFormData[]) {
  try {
    // Transform each user's data before sending
    const transformedUsers = users.map((user) => ({
      ...user,
      idnum: Number(user.idnum),
      college_id: user.college_id ? Number(user.college_id) : null,
      program_id: user.program_id ? Number(user.program_id) : null,
      year_level: user.year_level ? Number(user.year_level) : null,
    }));

    // Send the transformed data to the API
    const res = await api.post(`/user/bulk`, { users: transformedUsers });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error adding users:", error);
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
    console.error("Error adding reviewer:", error);
  }
}
