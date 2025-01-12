import Header from "@/components/dashboard/colleges/Header";
import React from "react";
import Attempt from "./Attempt";
import Attempt404 from "@/app/(dashboard)/student/ components/Attempt/Attempt404";
import { AttemptType } from "../../attempt/[attempt_id]/page";
import { getAttemptByID } from "@/actions/attempt.action";

export default async function AttemptPage({ params }: { params: any }) {
  const { attempt_id } = await params;
  if (!attempt_id) return <Attempt404 />;

  const attempt: AttemptType[] = await getAttemptByID(Number(attempt_id));
  console.log("Attempt:", attempt);
  return (
    <div>
      <Header title="Attempt" />
      <Attempt attempt={attempt[0]} />
    </div>
  );
}
