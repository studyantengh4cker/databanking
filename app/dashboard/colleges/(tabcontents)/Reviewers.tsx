import React, { useMemo } from "react";
import { College } from "../Colleges";
import { ReviewerData } from "@/lib/DummyData";
import ReviewerCard from "@/components/dashboard/ReviewerCard";
import { AddUserModal } from "@/components/modal/AddUserModal";
import AddReviewerForm from "@/components/forms/AddReviewerForm";

interface ReviewersProps {
  college: College | null;
}

export default function Reviewers({ college }: ReviewersProps) {
  const filteredData = useMemo(() => {
    if (college) {
      return ReviewerData.filter((data) => data.college === college.shortname);
    }
    return ReviewerData;
  }, [college]);

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl min-h-[40vh] items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <AddUserModal college={college} title="Add Reviewer" buttonTitle="Add Reveiwer" children={<AddReviewerForm/>} />
        <input
          type="text"
          name="search"
          placeholder="Search for reviewers by name"
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          name="role-filter"
          id="role-filter"
          className="border rounded px-3 py-2"
        >
          <option value="">Add Filter</option>
          <option value="COC">COC</option>
          <option value="COE">COE</option>
          <option value="CED">CED</option>
        </select>
      </header>
      <main className="flex flex-wrap gap-5 ">
        {filteredData.length !== 0
          ? filteredData.map((data, index) => {
              return <ReviewerCard key={index} college={college} data={data} />;
            })
          : "No Reviewers for this College"}
      </main>
    </div>
  );
}
