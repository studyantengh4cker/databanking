import React from "react";
import ItemCard from "./ItemCard";

interface TestBodyProps {
  test_items: any[];
  handle_answer: (questionId: number, status: string) => void;
  handle_flag: (questionId: number, isFlagged: boolean) => void;
}

export default function TestBody({ test_items, handle_answer,handle_flag }: TestBodyProps) {
  return (
    <div className="questions-container flex-1 flex flex-col gap-10 max-h-full overflow-auto">
      {test_items && test_items.length > 0 ? (
        test_items.map((item, index) => {
          return (
            <div key={item.id}>
              <ItemCard
                handle_answer={handle_answer}
                handle_flag={handle_flag}
                question={item.question}
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
