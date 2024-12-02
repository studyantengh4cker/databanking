import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import { College, colleges, Programs } from "@/app/dashboard/colleges/Colleges";
import { Reviewer } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ReviewerCardProps {
  college: College | null;
  data: Reviewer;
}

export default function ReviewerCard({ college, data }: ReviewerCardProps) {
  const isActive = false;
  const navigate = useRouter();

  const collegeData = useChooseCollege(data.college_id, data.program_id);

  const handleNavigateTo = (id: number) => {
    if (!id) return;
    // console.log(id)
    navigate.push(`/dashboard/reviewer/${id}`);
  };

  return (
    <div
      onClick={() => handleNavigateTo(data.id)}
      className="cursor-pointer p-6 relative z-20 rounded-2xl shadow-lg bg-gradient-to-t from-[#000000a2] text-white min-w-[350px] min-h-[150px] flex justify-between items-start hover:scale-105 duration-300 ease-out"
      style={{ backgroundColor: `${college ? college.color : "#720000"}` }}
    >
      <div className="col flex flex-col h-full justify-between items-start">
        <div className="info flex flex-col gap-1">
          <h1 className="text-[20px] font-semibold">{data.reviewer_name}</h1>
          <p className="font-extralight text-[13px]">
            {collegeData?.currentProgram?.name || "No program available"}
          </p>
          <p className="text-[8px]">SY {data.school_year}</p>
        </div>

        <button>View</button>
      </div>
      <div className="col">
        <p
          className="font-bold"
          style={{ color: `${isActive ? "#00FF55" : "#D00000"}` }}
        >
          {isActive ? "Active" : "Inactive"}
        </p>
      </div>
      <div className="absolute -right-0 top-0 overflow-hidden h-full w-[60%] z-10 pl-28 p-0 opacity-30 rounded-r-3xl">
        <Image
          src={`${collegeData?.image || "/default-image.png"}`}
          alt="logo"
          width={200}
          height={190}
          className="object-cover object-bottom relative z-0 scale-[2]"
        />
      </div>
    </div>
  );
}
