'use client'
import React from "react";
import { AttemptType } from "../../attempt/[attempt_id]/page";

interface AttemptProps {
  attempt: AttemptType | null;
}

export default function Attempt({ attempt }: AttemptProps) {
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Attempt Details</h1>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          Print
        </button>
      </header>
      <main className="space-y-4 text-gray-700">
        <p>
          <span className="font-medium">ID:</span> {attempt?.id ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Created At:</span> {formatDate(attempt?.created_at)}
        </p>
        <p>
          <span className="font-medium">Expire Time:</span> {formatDate(attempt?.expire_time)}
        </p>
        <p>
          <span className="font-medium">Status:</span> {attempt?.status ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Score:</span> {attempt?.score ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Time Remaining:</span> {attempt?.time_remaining ?? "N/A"} minutes
        </p>
        <p>
          <span className="font-medium">Reviewer ID:</span> {attempt?.reviewer_id ?? "N/A"}
        </p>
      </main>
    </div>
  );
}
