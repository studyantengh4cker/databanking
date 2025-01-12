import {
  getCollegeReviewerByID,
  
} from "@/actions/college.action";
import Header from "@/components/dashboard/colleges/Header";
import ReviewerBody from "@/components/dashboard/reviewer/ReviewerBody";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import ReviewerInfo from "@/components/dashboard/reviewer/ReviewerInfo";
import { auth } from "@/lib/auth";
import { Reviewer, User } from "@/lib/types";

const ReviewerPage = async ({ params }: { params: any }) => {
  const session = await auth();
  const user = session?.user;
  const { reviewer_id } = await params;
  if (!reviewer_id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(reviewer_id));

  return (
    <div className="p-5 flex flex-col">
      <Header title="Reviewer" />
      <ReviewerHeader reviewer={reviewer} />

      <ReviewerInfo reviewer={reviewer} />
      <ReviewerBody user={user as unknown as User} reviewer={reviewer} />
    </div>
  );
};

export default ReviewerPage;
