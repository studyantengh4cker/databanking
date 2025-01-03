"use client";
import React from "react";
import TestSpecificationForm from "../../../ components/Attempt/SpecificationForm";
import { Topic } from "@/lib/types";

interface AttemptProps {
  topics: Topic[] | null;
  reviewer_id: number;
  user_id: number;
}

export default function AttemptSpecification({
  topics,
  reviewer_id,
  user_id,
}: AttemptProps) {
  return (
    <div className="flex flex-col items-center gap-10 flex-1">
      <header>
        <h1 className="text-4xl font-medium">Take this test</h1>
      </header>
      <div className="flex flex-1 basis-[100%]">
        <TestSpecificationForm
          topics={topics}
          user_id={user_id}
          reviewer_id={reviewer_id}
        />
      </div>
    </div>
  );
}
