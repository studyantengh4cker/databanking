import React from "react";
import ItemCard from "./ItemCard";

interface TestBodyProps {
  test_items: any[];
}

export default function TestBody({ test_items }: TestBodyProps) {
  return (
    <div className="questions-container flex-1 flex flex-col gap-10 max-h-full overflow-auto">
      {test_items && test_items.length > 0 ? (
        test_items.map((item, index) => {
          return (
            <div key={item.id}>
              <ItemCard question={item.question} index={index} />
            </div>
          );
        })
      ) : (
        <p>No test items</p>
      )}
    </div>
  );
}
