import React, { useRef } from "react";
import { AttemptChoice, AttemptQuestion } from "../../test/components/ItemCard";
import ChoicesCircle from "../../test/components/ChoicesCircle";
import { resetQuestionAnswer } from "@/actions/attempt.action";

type AnswerOption = "A" | "B" | "C" | "D" | null;

interface ItemCardClickablesProps {
  question: AttemptQuestion;
  selectedAnswer: AnswerOption;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<AnswerOption>>;
  handle_answer: (questionId: string, answer: string | null) => void;
}

export default function ItemCardClickables({
  question,
  selectedAnswer,
  setSelectedAnswer,
  handle_answer,
}: ItemCardClickablesProps) {
  const circleRefs = useRef<
    Array<React.RefObject<{ clearCanvas: () => void }>>
  >([]);
  const handleReset = async () => {
    if (!question) return;
    setSelectedAnswer(null);
    circleRefs.current.forEach((ref) => ref.current?.clearCanvas());
    const res = await resetQuestionAnswer(
      String(question.reviewer_attempt_question_id)
    );
    if (res) {
      console.log(
        "Ressted this questions answer",
        question.reviewer_attempt_question_id
      );
    }
  };

  const handleAnswer = (choice: AttemptChoice) => {
    if (!question) return;
    setSelectedAnswer(choice.index as "A" | "B" | "C" | "D");
    handle_answer(String(question.reviewer_attempt_question_id), choice.index);
  };
  return (
    <div className="clickables flex items-center gap-4 flex-1">
      <div className="choices flex items-center gap-4">
        {question.choices.map((choice: AttemptChoice, idx) => {
          const ref = React.createRef<{ clearCanvas: () => void }>();
          circleRefs.current[idx] = ref;

          return (
            <ChoicesCircle
              ref={ref}
              key={choice.id + choice.index}
              choice_index={choice.index}
              isSelected={selectedAnswer === choice.index}
              isDisabled={selectedAnswer !== null}
              onComplete={() => handleAnswer(choice)}
              isAnswer={question.answer === choice.index}
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
  );
}
