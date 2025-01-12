import { AttemptType } from "@/app/(dashboard)/student/reviewers/[reviewer_id]/attempt/[attempt_id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface AttemptsTableProps {
  attempts: AttemptType[];
}

export default function AttemptsTable({ attempts }: AttemptsTableProps) {
  
  return (
    <Table className="flex-1">
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Time Remaining</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attempts.length > 0
          ? attempts.map((attempt) => {
              return (
                <TableRow key={attempt.id}>
                  <TableCell >{attempt.id}</TableCell>
                  <TableCell >{attempt.score}</TableCell>
                  <TableCell >{attempt.status}</TableCell>
                  <TableCell >{attempt.time_remaining}</TableCell>
                  <TableCell >{attempt.user_id}</TableCell>
                </TableRow>
              );
            })
          : ""}
      </TableBody>
    </Table>
  );
}
