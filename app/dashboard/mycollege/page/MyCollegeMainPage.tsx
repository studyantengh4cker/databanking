"use client";
import { Session } from "next-auth";
import CollegeData from "../../colleges/CollegeData";
import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import CollegeBanner from "@/components/dashboard/colleges/CollegeBanner";
import Reviewers from "../../colleges/(tabcontents)/Reviewers";

interface MyCollegeMainPageProps {
  session: Session;
}

export default function MyCollegeMainPage({ session }: MyCollegeMainPageProps) {
  const college = useChooseCollege(
    session.user.college_id ,
    session.user.program_id
  );
  
  return (
    <div>
      <CollegeBanner college={college} />
      <Reviewers college={college} />
    </div>
  )
}
