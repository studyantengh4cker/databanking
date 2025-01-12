import { AttemptType } from "@/app/(dashboard)/student/reviewers/[reviewer_id]/attempt/[attempt_id]/page";
import Link from "next/link";
import PendingAttemptCard from "./PendingAttemptCard";

interface TestSpecificationsProps {
  reviewer_id: number;
  pendingAttempt: AttemptType[];
}

export default function TestSpecifications({
  reviewer_id,
  pendingAttempt,
}: TestSpecificationsProps) {
  return (
    <div className="p-5 flex flex-col flex-1 gap-4">
      <div className="row flex gap-20 [&_button]:flex-1 [&_button]:bg-[#720000] [&_button]:rounded-xl [&_button]:text-white [&_button]:py-2">
        <Link
          href={`/student/reviewers/${reviewer_id}/attempts`}
          className="bg-[#720000] px-5 py-2 rounded-xl text-white hover:bg-[#320000]"
        >
          Attempt History
        </Link>
      </div>
      <div className="test-specification-card">
        <div className="head bg-[#320000] rounded-t-xl text-white p-5">
          <p>Test Specification</p>
        </div>
        <div className="body shadow-md rounded-b-xl bg-white flex flex-col flex-1 items-start p-5 min-h-full gap-10">
          {pendingAttempt.length > 0 ? (
            <PendingAttemptCard pendingAttempt={pendingAttempt[0]} />
          ) : (
            <p>Test is not yet Specified</p>
          )}
          {pendingAttempt.length > 0 ? (
            <Link
              className="bg-[#720000] px-5 py-2 rounded-xl text-white hover:bg-[#320000]"
              href={`/student/reviewers/${reviewer_id}/attempt/${pendingAttempt[0].id}`}
            >
              Continue Attempt
            </Link>
          ) : (
            <Link
              className="bg-[#720000] px-5 py-2 rounded-xl text-white hover:bg-[#320000]"
              href={`/student/reviewers/${reviewer_id}/attempt`}
            >
              Take Test
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
