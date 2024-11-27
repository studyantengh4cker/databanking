"use server";

import { AddDeanFormData } from "@/components/forms/AddDeanForm";
import api from "@/lib/api";

export async function addDeanorProgramHead(formvalue: AddDeanFormData) {
  try {
    const transformedFormValue = {
      ...formvalue,
      idnum: Number(formvalue.idnum),
      college_id: Number(formvalue.college_id),
      program_id: Number(formvalue.program_id),
    };

    const res = await api.post(`/user`, transformedFormValue);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching college users:", error);
  }
}
