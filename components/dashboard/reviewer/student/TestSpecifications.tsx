import Link from "next/link";
import React from "react";

interface TestSpecificationsProps {
  reviewer_id: number;
}

export default function TestSpecifications({
  reviewer_id,
}: TestSpecificationsProps) {
  return (
    <div className="p-5 flex flex-col flex-1 gap-4">
      <div className="row flex gap-20 [&_button]:flex-1 [&_button]:bg-[#720000] [&_button]:rounded-xl [&_button]:text-white [&_button]:py-2">
        <button className="hover:bg-[#360000]">Progress Report</button>
      </div>
      <div className="test-specification-card">
        <div className="head bg-[#320000] rounded-t-xl text-white p-5">
          <p>Test Specification</p>
        </div>
        <div className="body shadow-md rounded-b-xl bg-white flex flex-col flex-1 items-start p-5 min-h-full gap-10">
          <p>Test is not yet specified</p>
          <Link className="bg-[#720000] px-5 py-2 rounded-xl text-white" href={`/student/reviewers/${reviewer_id}/attempt`}>
            Take Test
          </Link>
        </div>
      </div>
    </div>
  );
}
