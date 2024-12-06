"use server";

import api from "@/lib/api";

export async function getCollegeUsers(
  role: string,
  collegeId?: string,
  page?: number
) {
  try {
    // Prepare query parameters
    const checkID = collegeId ? `college_id=${collegeId}` : "";
    const checkPage = page ? `page=${page}` : "";

    // Construct the query string dynamically
    const queryParams = [checkID, `role=${role}`, checkPage]
      .filter(Boolean)
      .join("&");

    // Call the API endpoint
    const res = await api.get(`/users?${queryParams}`);

    // Check if the API response is successful
    if (res.data && res.data.status === "success") {
      console.log(res.data.data);
      return res.data.data;
    } else {
      console.error("API response status is not success:", res.data);
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching college users:", error);
    return null; // Return null in case of an error
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

export async function getCollegeReviewerByID(id: number) {
  try {
    const res = await api.get(`/reviewer/${id}`);

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching college reviewers:", error);
  }
}
