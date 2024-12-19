import { getCollegeReviewerByID, getTopicById } from "@/actions/college.action";
import Header from "@/components/dashboard/colleges/Header";
import TopicBody from "@/components/dashboard/reviewer/topics/TopicBody";
import TopicHeader from "@/components/dashboard/reviewer/topics/TopicHeader";
import { Reviewer, Topic } from "@/lib/types";
import React from "react";

export default async function TopicPage({ params }: { params: any }) {
  const { topic_id,reviewer_id } = await params;
  if (!topic_id) return null;
  if (!reviewer_id) return null;
  const topic: Topic = await getTopicById(Number(topic_id));
  const reviewer: Reviewer = await getCollegeReviewerByID(Number(reviewer_id))
  return (
    <div className="">
      <Header title="Topic" />
      <TopicHeader topic={topic} reviewer={reviewer} />
      <TopicBody topic={topic} />
    </div>
  );
}
