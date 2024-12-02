"use client";

import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import { Reviewer } from "@/lib/types";
import Image from "next/image";

interface ReviewerHeaderProps {
  reviewer: Reviewer;
}

export default function ReviewerHeader({ reviewer }: ReviewerHeaderProps) {
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );
  return (
    <div className="w-full flex flex-col">
        
      <div className="flex items-center justify-between px-20 py-10 bg-white shadow-md rounded-2xl w-full">
        <Image
          src={collegeData?.image || ""}
          alt={`${collegeData.shortname} logo`}
          height={220}
          width={220}
        />
        <div className="info-container w-[55%]">
          <p className="text-sm ">{reviewer.college.college_name}</p>
          <h1 className="text-6xl font-medium">{reviewer.reviewer_name}</h1>
          <h2 className="text-2xl font-extralight">
            for {reviewer.program.program_name}
          </h2>
        </div>
        <div className="image w-[310px] h-[280px]"></div>
      </div>
    </div>
  );
}
