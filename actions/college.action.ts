"use server";

import api from "@/lib/api";

export async function getCollegeUsers(role: string, collegeId?: string, page?: number) {
  try {
    const checkID = collegeId ? `college_id=${collegeId}` : "";
    const checkPage = page ? `page=${page}` : "";
    const queryParams = [checkID, `role=${role}`, checkPage].filter(Boolean).join("&");

    const res = await api.get(`/user/getbycollege?${queryParams}`);

    if (res.data.status === "success") {
      return res.data.data;
    }
    
  } catch (error) {
    console.error("Error fetching college users:", error);
  }
}

export async function getCollegeReviewers(collegeId?: string, page?: number) {
  try {
    const checkID = collegeId ? `college_id=${collegeId}` : "";
    const checkPage = page ? `page=${page}` : "";
    const queryParams = [checkID, checkPage].filter(Boolean).join("&");
    // /getbycollege?${queryParams}
    const res = await api.get(`/reviewer`);

    if (res.data.status === "success") {
      return res.data.data;
    }
    
  } catch (error) {
    console.error("Error fetching college reviewers:", error);
  }
}