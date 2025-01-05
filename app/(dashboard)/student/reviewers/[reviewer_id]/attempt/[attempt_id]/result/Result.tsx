'use client'
import React from "react";

import { AttemptResult } from "./page";

import { useRouter, usePathname } from "next/navigation";
import Scope from "@/app/(dashboard)/student/ components/Attempt/Scope";
import ResultTable from "@/app/(dashboard)/student/ components/Result/ResultTable";

interface ResultProps {
  attempt_result: AttemptResult;
}

export default function Result({ attempt_result }: ResultProps) {
  const router = useRouter();
  const pathname = usePathname();

  const review_attempt = () => {
    if (pathname) {
      const reviewPath = pathname.replace("/result", "");
      router.push(reviewPath);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <header className="flex gap-10">
        <h1 className="text-[#720000] font-semibold text-4xl">
          Reviewer Title
        </h1>
        <div className="bar bg-[#720000] rounded-md flex-1"></div>
      </header>
      <main className="flex-1 flex gap-10">
        <div className="text-scope basis-[30%] py-10 px-5">
          <Scope attempt_result={attempt_result} />
        </div>
        <div className="result flex-1 flex flex-col items-center p-10 gap-10">
          <ResultTable attempt_result={attempt_result} />
          <div className="flex flex-col gap-3 items-center">
            <p>Your Grade for this Attempt</p>
            <p>
              {attempt_result?.marks} / {attempt_result?.max_points}
            </p>
            <button
              onClick={review_attempt}
              className="px-4 py-2 bg-[#720000] text-white rounded-md hover:bg-[#960000] transition"
            >
              Review Attempt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
