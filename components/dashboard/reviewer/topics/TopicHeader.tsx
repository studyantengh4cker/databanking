"use client";

import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import AddSubtopicForm from "@/components/forms/AddSubtopicForm";
import { AddDataModal } from "@/components/modal/AddDataModal";
import { Reviewer, Topic } from "@/lib/types";
import React from "react";

export interface TopicProps {
  topic: Topic;
  reviewer: Reviewer;
}

export default function TopicHeader({ topic, reviewer }: TopicProps) {
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );
  return (
    <header className="flex gap-5 items-start ">
      <h1>{topic?.topic_name || "No Topic Name"} </h1>
      <AddDataModal
        title={"Add SubTopic"}
        buttonTitle={"Add Subtopic"}
        college={collegeData}
      >
        <AddSubtopicForm topic_id={String(topic.id)} />
      </AddDataModal>
    </header>
  );
}
