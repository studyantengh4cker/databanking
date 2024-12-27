import React from "react";
import ChoicesCircle from "./ChoicesCircle";
import { Choice, Question } from "@/lib/types";

interface ItemsCardProps {
  question: Question | null;
  index: number;
}

export default function ItemCard({ question, index }: ItemsCardProps) {
  return (
    <div className="flex [&_p]:m-0 gap-4 flex-1">
      <p className="bg-[#720000] rounded-full w-10 h-10 flex items-center justify-center text-white text-sm sm:text-base md:text-lg lg:text-xl">
        {index + 1}
      </p>
      <div className="question-details flex flex-1 gap-20 flex-wrap">
        <div className=" flex-col flex-1">
          <p className="text-[#777777]">Questions</p>
          <p>
            {question ? question.question_content : <p>No question content</p>}
          </p>
          <div className="choices">
            {question ? (
              question?.choices.map((choice: Choice) => {
                return (
                  <div key={choice.id} className="flex gap-3">
                    <p>{choice.choice_index}.{")"}</p>
                    <p>{choice.choice_content}</p>
                  </div>
                )
              })
            ) : (
              <p>No question choices</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1">
          <div className="choices flex items-center gap-4">
            {question ? (
              question?.choices.map((choice: Choice) => {
                return (
                  <div className="choice" key={choice.id}>
                    <ChoicesCircle isDisabled={false} choice_index={choice.choice_index} />
                  </div>
                );
              })
            ) : (
              <p>No question choices</p>
            )}
          </div>
          <button className="bg-[#720000] rounded-xl px-10 py-1 text-white">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
