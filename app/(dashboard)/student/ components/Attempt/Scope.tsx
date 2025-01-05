import React from "react";
import { AttemptResult } from "../../reviewers/[reviewer_id]/attempt/[attempt_id]/result/page";

interface ScopeProps {
  attempt_result: AttemptResult;
}

export default function Scope({ attempt_result }: ScopeProps) {
  return (
    <div className="flex-1">
        <h1>Scope</h1>
        {Object.entries(attempt_result.scope).map(([subject, topics]) => (
      <div key={subject}>
        <h3>{subject}</h3>
        <div className="px-5">
          {topics.map((topic: any, index: number) => (
            <p key={index}>{topic}</p>
          ))}
        </div>
      </div>
    ))}
    </div>
  );
}
