import React from "react";
import ItemCard from "./ItemCard";

interface TestBodyProps {
  questions: any[];
  attempt: any;
  handle_answer: (questionId: string, answer: string | null) => void;
  handle_flag: (questionId: string, isFlagged: boolean) => void;
}

export default function TestBody({
  attempt,
  questions,
  handle_answer,
  handle_flag,
}: TestBodyProps) {
  return (
    <div className="questions-container flex-1 flex flex-col gap-10 max-h-full overflow-auto">
      {questions && questions.length > 0 ? (
        questions.map((item, index) => {
          return (
            <div key={index}>
              <ItemCard
                attempt={attempt}
                handle_answer={handle_answer}
                handle_flag={handle_flag}
                question={item}
                index={index}
              />
            </div>
          );
        })
      ) : (
        <p>No test items</p>
      )}
    </div>
  );
}
