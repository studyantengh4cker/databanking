"use client";
import { getCollegeUsers } from "@/actions/college.action";
import { useEffect, useState } from "react";
// import { College } from "../dashboard/colleges/Colleges";

export const useGetCollegeUsers = (
  p0: string,
  id: string | undefined,
  { role, college }: { role: string; college: string | null | undefined }
) => {
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      //Isa ra ka college and naa so 1 ra
      if (college && college === "1") {
        const fetchedUsers = await getCollegeUsers(role, college);
        setUserData(fetchedUsers);
      }else {
        const fetchedUsers = await getCollegeUsers(role);
        setUserData(fetchedUsers);
      }
    };

    fetchUsers();
  }, [college, role]);
  return { userData };
};
