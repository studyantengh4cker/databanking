"use client";
import { getCollegeUsers } from "@/actions/college.action";
import { useEffect, useState } from "react";
// import { College } from "../dashboard/colleges/Colleges";

export const useGetCollegeUsers = (
  p0: string,
  id: string | undefined,
  { role, college }: { role: string; college: string | undefined }
) => {
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getCollegeUsers(role, college && college);
      setUserData(fetchedUsers);
    };

    fetchUsers();
  }, [college, role]);
  return { userData };
};
