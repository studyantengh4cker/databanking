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

export async function fetchReviewer(college_id: number, program_id: number) {
  try {
    const res = await api.get(`/getreviewer`, {
      params: {
        college_id,
        program_id,
      },
    });

    console.log("Fetched reviewers:", res.data);

    return res.data.data.reviewer;
  } catch (error) {
    console.log(error);
  }
}
