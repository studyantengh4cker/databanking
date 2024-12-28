import { ReviewerQuestion } from "@/lib/types";
import React, { useState, useEffect } from "react";

interface ItemNavigationCardProps {
  question: ReviewerQuestion;
  index: number;
}

export default function ItemNavigationCard({
  question,
  index,
}: ItemNavigationCardProps) {
  const [status, setStatus] = useState<string>("not_answered");
  const [isFlagged, setIsFlagged] = useState<boolean>(false);

  const borderColor = isFlagged ? "#FEAA01" : "#152259";
  const backgroundColor =
    isFlagged ? "#FEAA01" : status === "answered" ? "#152259" : "transparent";

  useEffect(() => {
    if (question) {
      setStatus(question.status);
      setIsFlagged(question.isFlagged);
    }
  }, [question]);

  return (
    <div
      className={`w-[40px] h-[55px] border-solid ${
        status === "answered" || isFlagged ? "border-4" : "border-2"
      } rounded-xl flex flex-col items-center cursor-pointer`}
      style={{ borderColor: borderColor }}
    >
      <a href={`#${String(question.id)}`} className="flex-1">
        {index + 1}
      </a>
      <div
        className="bottom-container flex-1 w-full rounded-b-lg"
        style={{ backgroundColor: backgroundColor }}
      ></div>
    </div>
  );
}
