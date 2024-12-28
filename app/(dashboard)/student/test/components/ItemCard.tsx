import React, { useRef } from "react";
import ChoicesCircle from "./ChoicesCircle";
import { Choice, ReviewerQuestion } from "@/lib/types";
import { Flag, FlagOffIcon } from "lucide-react";

interface ItemsCardProps {
  question: ReviewerQuestion | null;
  index: number;
  handle_answer: (questionId: number, status: string) => void;
  handle_flag: (questionId: number, isFlagged: boolean) => void;
}

export default function ItemCard({
  question,
  index,
  handle_answer,
  handle_flag,
}: ItemsCardProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<
    "A" | "B" | "C" | "D" | null
  >(null);
  const circleRefs = useRef<
    Array<React.RefObject<{ clearCanvas: () => void }>>
  >([]);

  const handleReset = () => {
    if (!question) return;
    setSelectedAnswer(null);
    circleRefs.current.forEach((ref) => ref.current?.clearCanvas());
    handle_answer(question.id, "not_answered");
  };

  const handleAnswer = (choice: Choice) => {
    if (!question) return;
    setSelectedAnswer(choice.choice_index as "A" | "B" | "C" | "D");
    handle_answer(question.id, "answered");
  };

  const handleFlag = () => {
    if (!question) return;
    handle_flag(question.id, !question.isFlagged);
  };

  if (!question) return null;

  return (
    <div id={String(question.id)} className="flex [&_p]:m-0 gap-4 flex-1">
      <div className="flex-col flex gap-3 items-center ">
        <p className="bg-[#720000] rounded-full w-10 h-10 flex items-center justify-center text-white text-sm sm:text-base md:text-lg lg:text-xl">
          {index + 1}
        </p>
        <button onClick={handleFlag}>
          {question.isFlagged? <Flag /> : <FlagOffIcon/>}
        </button>
      </div>
      <div className="question-details flex flex-1 gap-20 flex-wrap">
        <div className="flex-col flex-1">
          <p className="text-[#777777]">Questions</p>
          <p>{question.question_content}</p>
          <div className="choices">
            {question.choices.map((choice: Choice) => (
              <div
                key={choice.id + choice.choice_index}
                className={`flex gap-3 ${
                  selectedAnswer === choice.choice_index
                    ? "bg-green-500 px-2 text-white rounded-md"
                    : ""
                }`}
              >
                <p>{choice.choice_index}.</p>
                <p>{choice.choice_content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1">
          <div className="choices flex items-center gap-4">
            {question.choices.map((choice: Choice, idx) => {
              const ref = React.createRef<{ clearCanvas: () => void }>();
              circleRefs.current[idx] = ref;

              return (
                <ChoicesCircle
                  ref={ref}
                  key={choice.id + choice.choice_index}
                  choice_index={choice.choice_index}
                  isSelected={selectedAnswer === choice.choice_index}
                  isDisabled={selectedAnswer !== null}
                  onComplete={() => handleAnswer(choice)}
                />
              );
            })}
          </div>
          <button
            className="bg-[#720000] rounded-xl px-10 py-1 text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
