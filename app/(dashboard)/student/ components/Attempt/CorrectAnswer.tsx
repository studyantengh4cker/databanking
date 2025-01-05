import React from "react";
import { AttemptQuestion } from "../../test/components/ItemCard";

interface CorrectAnswerProps {
  question: AttemptQuestion;
}

export default function CorrectAnswer({ question }: CorrectAnswerProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
      <div
        className={`text-lg font-bold ${
          question.is_correct ? "text-green-600" : "text-red-600"
        }`}
      >
        Your Answer is {question.is_correct ? "Correct" : "Wrong"}
      </div>
      <div className="text-gray-800">
        <p className="font-medium text-sm">Correct Answer:</p>
        <p className="text-lg font-semibold text-blue-600">
          {question.correct_answer}
        </p>
      </div>
    </div>
  );
}
