"use server";

import api from "@/lib/api";

export async function getCollegeUsers(role: string, collegeId?: string) {
  try {
    const res = await api.get(`/user/getbycollege/${collegeId}/${role}`);
    if (res.data.status == "success") {
      return res.data.data.users;
    }
  } catch (error) {
    console.log(error);
  }
}
