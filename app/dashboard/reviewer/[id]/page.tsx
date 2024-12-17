import { getCollegeReviewerByID } from "@/actions/college.action";
import ReviewerBody from "@/components/dashboard/reviewer/ReviewerBody";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import ReviewerInfo from "@/components/dashboard/reviewer/ReviewerInfo";
import { Reviewer } from "@/lib/types";

const ReviewerPage = async ({ params }: { params: any }) => {
  const {id} = await params
  if (!id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(id));
  return (
    <div className="p-14">
      <ReviewerHeader reviewer={reviewer} />
      <ReviewerInfo reviewer={reviewer} />
      <ReviewerBody reviewer={reviewer} />
    </div>
  );
};

export default ReviewerPage;
