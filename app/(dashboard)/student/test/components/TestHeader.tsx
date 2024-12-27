import React from "react";

export default function TestHeader() {
  return (
    <div className="flex items-center [&_p]:m-0 gap-5">
      <h1>Test Header</h1>
      <div className="bg-[#720000] rounded-2xl py-4 px-10 flex-1 text-white">
        <p>
          <strong>TIP:</strong> If your cursor leaves the circle, it will stop drawing.
        </p>
      </div>
    </div>
  );
}
