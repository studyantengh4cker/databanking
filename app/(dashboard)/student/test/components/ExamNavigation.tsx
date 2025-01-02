import React from "react";
import ItemNavigationCard from "./ItemNavigationCard";

interface ExamNavigationProps {
  questions: any[] | null;
}

export default function ExamNavigation({ questions }: ExamNavigationProps) {
  return (
    <div className="flex flex-col gap-4 p-4 px-10 text-[#152259] fixed">
      <h1 className="font-semibold text-2xl">Exam Navigation</h1>
      <p>Page 1 of {questions && questions.length }</p>
      <div className="container flex flex-wrap gap-4">
        {questions && questions.length > 0 ? (
          questions.map((item, index) => {
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
