"use server";

import api from "@/lib/api";

export async function getAllReviewers() {
  try {
    const res = await api.get("reviewer");

    if (res.data.status == "success") {
      return res.data.data.reviewers;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}
