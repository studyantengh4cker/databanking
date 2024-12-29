import Header from "@/components/dashboard/colleges/Header";
import React from "react";
import Attempt from "./Attempt";
import { getTopicsByReviewerId } from "@/actions/college.action";

export default async function AttemptPage({ params }: any) {
  const { reviewer_id } = await params;
  if (!reviewer_id) return null;
  const topics = await getTopicsByReviewerId(Number(reviewer_id));
  console.log(topics)
  return (
    <div>
      <Header title="Attempt" />
      <Attempt topics={topics.topics} />
    </div>
  );
}
