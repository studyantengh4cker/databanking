import { getReviewerTopics } from "@/actions/topic.action";
import React from "react";
import Topic from "./Topic";

export default async function Topics({ reviewerId }: { reviewerId: number }) {
  const topics = await getReviewerTopics(reviewerId);

  return (
    <section>
      {topics.map((topic: any) => (
        <Topic topic={topic} key={topic.id} />
      ))}
    </section>
  );
}
