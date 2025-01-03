import Header from "@/components/dashboard/colleges/Header";
import React from "react";
import AttemptSpecification from "./AttemptSpecification";
import { getTopicsByReviewerId } from "@/actions/college.action";
import { Session } from "next-auth";
import { auth } from "@/lib/auth";

export default async function AttemptPage({ params }: any) {
  const { reviewer_id } = await params;
  if (!reviewer_id) return null;
  const topics = await getTopicsByReviewerId(Number(reviewer_id));
  const session: Session | null = await auth();
  if (!session) return;
  return (
    <div>
      <Header title="Attempt" />
      <AttemptSpecification
        topics={topics.topics}
        reviewer_id={Number(reviewer_id)}
        user_id={Number(session.user.id)}
      />
    </div>
  );
}
