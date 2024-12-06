import { getCollegeReviewerByID } from "@/actions/college.action";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import ReviewerInfo from "@/components/dashboard/reviewer/ReviewerInfo";
import ReviewerQuestions from "@/components/dashboard/reviewer/ReviewerQuestions";
import { Reviewer } from "@/lib/types";

const ReviewerPage = async ({ params }: { params: any }) => {
  if (!params.id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(params.id));

  return (
    <div className="p-14">
      <ReviewerHeader reviewer={reviewer} />
      <ReviewerInfo reviewer={reviewer} />
      <ReviewerQuestions reviewer={reviewer} />
    </div>
  );
};

export default ReviewerPage;
