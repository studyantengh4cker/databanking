import React from "react";
import ItemNavigationCard from "./ItemNavigationCard";

interface ExamNavigationProps {
  test_items: any[] | null;
}

export default function ExamNavigation({ test_items }: ExamNavigationProps) {
  return (
    <div className="flex flex-col gap-4 p-4 text-[#152259]">
      <h1 className="font-semibold text-2xl">Exam Navigation</h1>
      <p>Page 1 of 10</p>
      <div className="container flex flex-wrap gap-4">
        {test_items && test_items.length > 0 ? (
          test_items.map((item, index) => {
            return <ItemNavigationCard key={item.id} index={index} />;
          })
        ) : (
          <p>No test items</p>
        )}
      </div>
    </div>
  );
}
