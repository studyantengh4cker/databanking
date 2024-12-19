import React from "react";

export default function TestSpecifications() {
  return (
    <div className="p-5 flex flex-col flex-1 gap-4">
      <div className="row flex gap-20 [&_button]:flex-1 [&_button]:bg-[#720000] [&_button]:rounded-xl [&_button]:text-white [&_button]:py-2">
        <button className="hover:bg-[#360000]">Progress Report</button>
        <button className="hover:bg-[#360000]">Edit Test Specification</button>
      </div>
      <div className="test-specification-card">
        <div className="head bg-[#320000] rounded-t-xl text-white p-5">
          <p>Test Specification</p>
        </div>
        <div className="body shadow-md rounded-b-xl bg-white flex-1 p-5 min-h-full">
            <p>Test is not yet specified</p>
        </div>
      </div>
    </div>
  );
}
