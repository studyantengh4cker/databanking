import React from "react";
import ItemNavigationCard from "./ItemNavigationCard";

interface ExamNavigationProps {
  test_items: any[] | null;
  // reviewer_id: number
  // attempt_id: number
}

export default function ExamNavigation({ test_items }: ExamNavigationProps) {
  return (
    <div className="flex flex-col gap-4 p-4 px-10 text-[#152259] fixed">
      <h1 className="font-semibold text-2xl">Exam Navigation</h1>
      <p>Page 1 of {test_items && test_items.length + 1}</p>
      <div className="container flex flex-wrap gap-4">
        {test_items && test_items.length > 0 ? (
          test_items.map((item, index) => {
            return <ItemNavigationCard key={item.id} index={index} question={item} />;
          })
        ) : (
          <p>No test items</p>
        )}
      </div>
      <div className="buttons flex gap-5">
        <button className="flex-1 bg-[#720000] hover:bg-[#320000] text-white rounded-md px-4 py-1 ">Prev Page</button>
        <button className="flex-1 bg-[#720000] hover:bg-[#320000] text-white rounded-md px-4 py-1 ">Next Page</button>
      </div>
    </div>
  );
}
