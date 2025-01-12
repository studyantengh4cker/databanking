import { getAttemptByReviewerID } from "@/actions/attempt.action";
import { getCollegeReviewerByID } from "@/actions/college.action";
import Header from "@/components/dashboard/colleges/Header";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import { Reviewer } from "@/lib/types";
import AttemptsTable from "../../components/Reviewers/AttemptsTable";

const ReviewerPage = async ({ params }: { params: any }) => {
  const { reviewer_id } = await params;
  if (!reviewer_id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(reviewer_id));

  const attempts = await getAttemptByReviewerID(Number(reviewer_id));

  if (!reviewer && !attempts) return;
  return (
    <div className="p-5 flex flex-col">
      <Header title="Reviewer" />
      <ReviewerHeader reviewer={reviewer} />
      <div className="flex flex-wrap flex-1 p-10">
        <h1 className="text-xl text-[#720000] p-10 ">Student Attempt Results</h1>
        <AttemptsTable attempts={attempts} />
      </div>
    </div>
  );
};

export default ReviewerPage;
