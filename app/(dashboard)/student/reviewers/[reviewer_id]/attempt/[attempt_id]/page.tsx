import { getAttempt, getAttemptQuestions } from "@/actions/attempt.action";
import Header from "@/components/dashboard/colleges/Header";
import React from "react";
import Attempt from "./Attempt";
import Attempt404 from "@/app/(dashboard)/student/ components/Attempt/Attempt404";

export interface AttemptType {
  id: number;
  reviewer_id: number;
  score: number;
  status: string;
  time_remaining: number;
  created_at: string;
  expire_time: string;
  updated_at: string;
  user_id: number;
}

export default async function TakeAttempt({ params }: any) {
  const { attempt_id } = await params;
  if (!attempt_id) return <Attempt404 />;

  let attempt_questions = await getAttemptQuestions(attempt_id);
  const attempt:AttemptType = await getAttempt(attempt_id);
  console.log("Attempt: ", attempt_questions);
  console.log("Attempt: ", attempt);
  if (attempt_questions.total_questions === 0) return <Attempt404 />;
  attempt_questions = { ...attempt_questions, attempt_id };
  return (
    <div>
      <Header title="Attempt" />
      <Attempt attempt_questions={attempt_questions} attempt={attempt} />
    </div>
  );
}
