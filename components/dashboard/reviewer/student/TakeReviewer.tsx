'use client'
import React from "react";
import Topics from "../Topics";
import { Reviewer, User } from "@/lib/types";

interface TakeReviewerProps{
  user: User | undefined
  reviewer: Reviewer
}

export default function TakeReviewer({ reviewer, user }: TakeReviewerProps) {
  return (
    <div className="">
      <h1>Scope Covered</h1>
      <Topics user={user} reviewer={reviewer} />
    </div>
  );
}
