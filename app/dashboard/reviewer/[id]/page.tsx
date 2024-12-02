import { getCollegeReviewerByID } from "@/actions/college.action";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import ReviewerInfo from "@/components/dashboard/reviewer/ReviewerInfo";
import ReviewerQuestions from "@/components/dashboard/reviewer/ReviewerQuestions";
import { Reviewer } from "@/lib/types";

interface ReviewerPageProps {
  params: {
    id: string;
  };
}

const ReviewerPage = async ({ params }: ReviewerPageProps) => {
  const { id } = await params;
  if (!id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(id));

  return (
    <div className="p-14">
      <ReviewerHeader reviewer={reviewer} />
      <ReviewerInfo reviewer={reviewer} />
      <ReviewerQuestions reviewer={reviewer} />
    </div>
  );
};

export default ReviewerPage;
