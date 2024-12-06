'use client'
import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import CollegeBanner from "@/components/dashboard/colleges/CollegeBanner";
import { Session } from "next-auth";
import React from "react";

interface ReviewersmainpageProps {
  session: Session;
}

export default function Reviewersmainpage({ session }: ReviewersmainpageProps) {
  const college = useChooseCollege(
    session.user.college_id,
    session.user.program_id
  );
  return (
    <div>
      <CollegeBanner college={college} />
    </div>
  );
}
