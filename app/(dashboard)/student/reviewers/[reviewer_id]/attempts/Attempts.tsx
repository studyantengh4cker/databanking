"use client";

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
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">ID</TableCell>
            <TableCell className="font-semibold">Score</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold">Time Remaining</TableCell>
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
