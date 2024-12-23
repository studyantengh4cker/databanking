"use client";

import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import { useGetCollegeReviewers } from "@/app/(custom_hooks)/useGetCollegeReviewers";
import CollegeBanner from "@/components/dashboard/colleges/CollegeBanner";
import LoadingCard from "@/components/dashboard/Loading/LoadingCard";
import { Session } from "next-auth";
import ReviewerCard from "../ components/Reviewers/ReviewerCard";



interface StudentsReviewersProps {
  session: Session;
}

export default function StudentsReviewers({ session }: StudentsReviewersProps) {
  const college = useChooseCollege(
    session.user.college_id,
    session.user.program_id
  );
  const { reviewers } = useGetCollegeReviewers(college.id, {
    college: college?.id,
  });
  return (
    <div className="w-full">
      <CollegeBanner college={college} />
     <div className="container flex gap-4 py-10"> {reviewers ? (
        reviewers.length > 0 &&
        reviewers.map((reviewer) => (
          <ReviewerCard key={reviewer.id} college={college} data={reviewer} />
        ))
      ) : (
        <LoadingCard />
      )}</div>
    </div>
  );
}
