import React from "react";
import { AttemptResult } from "../../reviewers/[reviewer_id]/attempt/[attempt_id]/result/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultTableProps {
  attempt_result: AttemptResult;
}

export default function ResultTable({ attempt_result }: ResultTableProps) {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const [month, day, year] = formattedDate.split(", ")[0].split("/");
    const time = formattedDate.split(", ")[1];

    return `Finished At ${day}-${month}-${year}, ${time}`;
  }

  const isPassed = attempt_result.feedback === "passed"

  const grade = ((attempt_result.marks / attempt_result.max_points) * 100).toFixed(2);


  return (
    <div className="flex-1 flex flex-col h-full basis-full">
      <Table className="w-full h-full table-auto">
        <TableHeader className="bg-[#720000] text-white">
          <TableRow>
            <TableCell>Session</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="h-full">
          <TableRow>
            <TableCell>{formatDate(attempt_result.finished_at)}</TableCell>
            <TableCell>{attempt_result.marks} / {attempt_result.max_points}</TableCell>
            <TableCell>{grade} / 100</TableCell>
            <TableCell className={`text-[${isPassed? "green" : "red"}]`}>{attempt_result.feedback}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
