"use server";

import api from "@/lib/api";

export async function getCollegeUsers(role: string, collegeId?: string) {
  try {
    const checkID =  collegeId ? `college_id=${collegeId}&` : ""
    const res = await api.get(
      `/user/getbycollege?${checkID}role=${role}`
    );
    if (res.data.status == "success") {
      return res.data.data.users;
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function getUsersbyRole(role: string) {
//   try {
//     const res = await api.get(`/user/getbycollege?role=${role}`);
//     if (res.data.status == "success") {
//       return res.data.data.users;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
