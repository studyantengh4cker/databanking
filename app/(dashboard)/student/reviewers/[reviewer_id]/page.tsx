import { getUserPendingAttempt } from "@/actions/attempt.action";
import {
  getCollegeReviewerByID,
} from "@/actions/college.action";
import Header from "@/components/dashboard/colleges/Header";
import ReviewerHeader from "@/components/dashboard/reviewer/ReviewerHeader";
import ReviewerInfo from "@/components/dashboard/reviewer/ReviewerInfo";
import TakeReviewer from "@/components/dashboard/reviewer/student/TakeReviewer";
import TestSpecifications from "@/components/dashboard/reviewer/student/TestSpecifications";
import { auth } from "@/lib/auth";
import { Reviewer, User } from "@/lib/types";
import { AttemptType } from "./attempt/[attempt_id]/page";

const ReviewerPage = async ({ params }: { params: any }) => {
  const session = await auth();
  if(!session) return
  const user = session.user;
  const { reviewer_id } = await params;
  if (!reviewer_id) return null;
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(reviewer_id));
  const pendingAttempt:AttemptType[] = await getUserPendingAttempt(Number(user?.id))
  console.log('pending attempt', pendingAttempt)
  return (
    <div className="p-5 flex flex-col">
      <Header title="Reviewer" />
      <ReviewerHeader reviewer={reviewer} />

      <div className="flex flex-wrap flex-1">
        <div className="col flex-1">
          <ReviewerInfo reviewer={reviewer} />
          <TakeReviewer user={user as unknown as User} reviewer={reviewer} />
        </div>
        <div className="col flex-1">
          <TestSpecifications reviewer_id={reviewer.id} pendingAttempt={pendingAttempt} />
        </div>
      </div>
    </div>
  );
};

export default ReviewerPage;
