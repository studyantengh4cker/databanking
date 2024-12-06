import { College } from "../Colleges";
import ReviewerCard from "@/components/dashboard/colleges/ReviewerCard";
import { AddUserModal } from "@/components/modal/AddUserModal";
import AddReviewerForm from "@/components/forms/AddReviewerForm";
import { useGetCollegeReviewers } from "@/app/(custom_hooks)/useGetCollegeReviewers";

interface ReviewersProps {
  college: College | null;
}

export default function Reviewers({ college }: ReviewersProps) {
  const { reviewers } = useGetCollegeReviewers(college?.id, {
    college: college?.id,
  });

  return (
    <div className="h-auto w-full flex flex-col gap-5 shadow-md rounded-3xl basis-full items-start py-10 px-14">
      <header className="flex w-full gap-4 items-center">
        <AddUserModal
          college={college}
          title="Add Reviewer"
          buttonTitle="Add Reveiwer"
        >
          <AddReviewerForm />
        </AddUserModal>
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
          <option value="COE">COE</option>
          <option value="CED">CED</option>
          <option value="CCS">CCS</option>
          <option value="CBA">CBA</option>
          <option value="CAS">CAS</option>
          <option value="COC">COC</option>
        </select>
      </header>
      <main className="flex flex-wrap gap-5">
        {reviewers && reviewers.length !== 0
          ? reviewers.map((reviewer) => {
              return (
                <ReviewerCard
                  key={reviewer.id}
                  college={college}
                  data={reviewer}
                />
              );
            })
          : "No Reviewers for this College"}
      </main>
    </div>
  );
}
