import React from "react";

import { Flag, FlagOffIcon } from "lucide-react";

import ItemCardClickables from "../../ components/Attempt/ItemCardClickables";
import CorrectAnswer from "../../ components/Attempt/CorrectAnswer";

export interface AttemptChoice {
  id: number;
  content: string;
  index: string;
}
export interface AttemptQuestion {
  question_id: number;
  reviewer_attempt_question_id: number;
  content: string;
  choices: AttemptChoice[];
  isFlagged: boolean;
  point: string;
  status: "answered" | "unanswered";
  answer: string;
  correct_answer: string | undefined;
  is_correct: boolean | undefined;
}

interface ItemsCardProps {
  attempt: any;
  question: AttemptQuestion | null;
  index: number;
  handle_answer: (questionId: string, answer: string | null) => void;
  handle_flag: (questionId: string, isFlagged: boolean) => void;
}

export default function ItemCard({
  attempt,
  question,
  index,
  handle_answer,
  handle_flag,
}: ItemsCardProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<
    "A" | "B" | "C" | "D" | null
  >(null);

  const handleFlag = () => {
    if (!question) return;
    handle_flag(
      String(question.reviewer_attempt_question_id),
      !question.isFlagged
    );
  };

  if (!question) return null;

  return (
    <div
      id={String(question.reviewer_attempt_question_id)}
      className="flex [&_p]:m-0 gap-4 flex-1"
    >
      <div className="flex-col flex gap-3 items-center ">
        <p className="bg-[#720000] rounded-full w-10 h-10 flex items-center justify-center text-white text-sm sm:text-base md:text-lg lg:text-xl">
          {index + 1}
        </p>
        <button onClick={handleFlag}>
          {question.isFlagged ? <Flag /> : <FlagOffIcon />}
        </button>
      </div>
      <div className="question-details flex flex-1 gap-20 flex-wrap">
        <div className="flex-col flex-1">
          <p className="text-[#777777]">Questions</p>
          <p>{question.content}</p>
          <div className="choices">
            {question.choices.map((choice) => {
              const isSelected = question.answer === choice.index;
              const isReviewMode = attempt.status !== "pending";
              // Only apply correct/incorrect styling if in review mode
              const backgroundColor = isReviewMode
                ? isSelected && question.is_correct
                  ? "bg-green-500"
                  : isSelected && !question.is_correct
                  ? "bg-red-500"
                  : ""
                : isSelected
                ? "bg-[#152259]"
                : "";

              return (
                <div
                  key={`${choice.id}-${choice.index}`}
                  className={`flex gap-3 px-2 py-2 rounded-md ${backgroundColor} ${
                    backgroundColor ? "text-white" : ""
                  }`}
                >
                  <p className="min-w-[20px]">{choice.index}.</p>
                  <p>{choice.content}</p>
                </div>
              );
            })}
          </div>
        </div>

        {attempt.status === "pending" ? (
          <ItemCardClickables
            question={question}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            handle_answer={handle_answer}
          />
        ) : (
          <CorrectAnswer question={question}></CorrectAnswer>
        )}
      </div>
    </div>
  );
}
