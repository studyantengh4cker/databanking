"use client";

import { useRouter } from "next/navigation";
import { AttemptType } from "../attempt/[attempt_id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttemptsProps {
  attempts: AttemptType[];
}

export default function Attempts({ attempts }: AttemptsProps) {
  const navigate = useRouter();
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">ID</TableCell>
            <TableCell className="font-semibold">Score</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold">Time Remaining</TableCell>
            <TableCell className="font-semibold">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No attempts found
              </TableCell>
            </TableRow>
          ) : (
            attempts.map((attempt) => (
              <TableRow key={attempt.id}>
                <TableCell>{attempt.id}</TableCell>
                <TableCell>{attempt.score || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      attempt.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : attempt.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {attempt.status}
                  </span>
                </TableCell>
                <TableCell>{attempt.time_remaining || "0:00"}</TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      navigate.push(
                        `/student/reviewers/${attempt.reviewer_id}/attempts/${attempt.id}`
                      )
                    }
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
