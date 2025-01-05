import React from "react";
import ItemNavigationCard from "./ItemNavigationCard";
import Timer from "../../ components/Attempt/Timer";
import { AttemptType } from "../../reviewers/[reviewer_id]/attempt/[attempt_id]/page";

interface ExamNavigationProps {
  questions: any[] | null;
  attempt: AttemptType;
  submit_attempt: () => void;
  finish_review: () => void
}

export default function ExamNavigation({
  attempt,
  questions,
  submit_attempt,
  finish_review
}: ExamNavigationProps) {
  
  return (
    <div className="flex flex-col gap-4 p-4 px-10 text-[#152259] fixed">
      <h1 className="font-semibold text-2xl">Exam Navigation</h1>
      {attempt.status == "pending" && (
        <Timer
          created_at={attempt.created_at}
          expire_time={attempt.expire_time}
        />
      )}
      <div className="container flex flex-wrap gap-4">
        {questions && questions.length > 0 ? (
          questions.map((item, index) => {
            return (
              <ItemNavigationCard
                key={item.question_id}
                index={index}
                question={item}
              />
            );
          })
        ) : (
          <p>No test items</p>
        )}
      </div>
      {attempt.status === "pending" ? (
        <div className="buttons flex gap-5">
          <button
            onClick={submit_attempt}
            className="flex-1 bg-[#720000] hover:bg-[#320000] text-white rounded-md px-4 py-1 "
          >
            Finish Attempt
          </button>
        </div>
      ) : (
        <div className="buttons flex gap-5">
          <button
            onClick={finish_review}
            className="flex-1 bg-[#720000] hover:bg-[#320000] text-white rounded-md px-4 py-1 "
          >
            Finish Review
          </button>
        </div>
      )}
    </div>
  );
}
