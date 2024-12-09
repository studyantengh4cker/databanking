"use client";
import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import AddReviewerQuestion from "@/components/forms/AddReviewerQuestion";
import { AddDataModal } from "@/components/modal/AddDataModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Reviewer } from "@/lib/types";

interface ReviewerQuestionsProps {
  reviewer: Reviewer;
}

export default function ReviewerQuestions({
  reviewer,
}: ReviewerQuestionsProps) {
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );

  // Example data for the table
  const questionsData = [
    {
      question: "What is your favorite subject?",
      topic: "Math",
      subtopic: "Subjects",
      action: "Edit",
    },
    {
      question: "How do you find the course structure?",
      topic: "Math",
      subtopic: "Structure",
      action: "Edit",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 [&_h1]:text-2xl [&_h1]:font-semibold">
      <header className="w-full flex items-center gap-10">
        <h1>Questions</h1>
        <AddDataModal
          title="Add Question"
          buttonTitle="Add Question"
          college={collegeData}
        >
          <AddReviewerQuestion />
        </AddDataModal>
      </header>
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Subtopic</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionsData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell>{row.subtopic}</TableCell>
                <TableCell>
                  <button className="text-blue-500 hover:text-blue-700">
                    {row.action}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
