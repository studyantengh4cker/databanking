"use client";
import { getCollegeReviewers } from "@/actions/college.action";
import { Pagination, Reviewer } from "@/lib/types";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

interface GetCollegeReviewerParams {
  college: string | undefined;
}

export interface CollegeReviewerResponse {
  reviewers: Reviewer[];
  pagination: Pagination;
}

export const useGetCollegeReviewers = (
  id: string | undefined,
  { college }: GetCollegeReviewerParams
) => {
  const [page, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery<CollegeReviewerResponse, Error>({
    queryKey: ["collegeReviewer", college, page],
    queryFn: async (): Promise<CollegeReviewerResponse> => {
      const response = await getCollegeReviewers(college, page);
      if (!response) {
        throw new Error('Failed to fetch college reviewers');
      }
      return response;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60000,
  });

  return {
    reviewers: data?.reviewers ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    setCurrentPage,
  };
};