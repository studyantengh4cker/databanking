"use client";
import { getCollegeUsers } from "@/actions/college.action";
import { Pagination, User } from "@/lib/types";
import { useEffect, useState } from "react";
// import { College } from "../dashboard/colleges/Colleges";

export const useGetCollegeUsers = (
  p0: string,
  id: string | undefined,
  { role, college }: { role: string; college: string | undefined }
) => {
  const [userData, setUserData] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>()
  const [page, setCurrentPage] = useState<number | undefined>()
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getCollegeUsers(role, college && college, page);
      setPagination(fetchedUsers.pagination)
      setUserData(fetchedUsers.users);
    };

    fetchUsers();
  }, [college, role]);
  return { userData, pagination, setCurrentPage };
};
