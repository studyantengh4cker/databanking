"use client";
import { getCollegeUsers } from "@/actions/college.action";
import { Pagination, User } from "@/lib/types";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from "react";

interface GetCollegeUsersParams {
  role: string;
  college: string | undefined;
}

export interface CollegeUsersResponse {
  users: User[];
  pagination: Pagination;
}

export const useGetCollegeUsers = (
  p0: string,
  id: string | undefined,
  { role, college }: GetCollegeUsersParams
) => {
  const [page, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery<CollegeUsersResponse, Error>({
    queryKey: ["collegeUsers", role, college, page],
    queryFn: async (): Promise<CollegeUsersResponse> => {
      const response = await getCollegeUsers(role, college, page);
      if (!response) {
        throw new Error('Failed to fetch college users');
      }
      return response;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60000,
  });

  return {
    users: data?.users ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    setCurrentPage,
  };
};