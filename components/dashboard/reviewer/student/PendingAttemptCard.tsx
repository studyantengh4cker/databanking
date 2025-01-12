import { AttemptType } from "@/app/(dashboard)/student/reviewers/[reviewer_id]/attempt/[attempt_id]/page";
import React from "react";

interface PendingAttemptCardProps {
  pendingAttempt: AttemptType;
}

function formatExpireTime(expireTime: string): string {
  const date = new Date(expireTime);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export default function PendingAttemptCard({
  pendingAttempt,
}: PendingAttemptCardProps) {
  return (
    <div className="p-4 ">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Pending Attempt</h2>
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">ID:</span> {pendingAttempt.id}
        </p>
        <p>
          <span className="font-medium text-gray-800">Expire Time:</span>{" "}
          {formatExpireTime(pendingAttempt.expire_time)}
        </p>
        <p>
          <span className="font-medium text-gray-800">Time Remaining:</span>{" "}
          {pendingAttempt.time_remaining} minutes
        </p>
        <p>
          <span className="font-medium text-gray-800">Status:</span> {pendingAttempt.status}
        </p>
      </div>
    </div>
  );
}
