import Header from "@/components/dashboard/colleges/Header";
import React from "react";
import Result from "./Result";
import { viewResult } from "@/actions/attempt.action";
import Attempt404 from "@/app/(dashboard)/student/ components/Attempt/Attempt404";

export interface AttemptResult {
  feedback: string;
  finished_at: string;
  grade: number;
  marks: number;
  scope: any[]; 
  total_questions: number;
  max_points: number
}

export default async function ResultPage({params}: any) {
  const {attempt_id} = await params
  if(!attempt_id) return
  const attempt_result:AttemptResult = await viewResult(attempt_id)
  if(!attempt_result) return <Attempt404 />
  console.log("attempt result: ", attempt_result)


  return (
    <div>
      <Header title="Result" />
      <Result attempt_result={attempt_result} />
    </div>
  );
}
