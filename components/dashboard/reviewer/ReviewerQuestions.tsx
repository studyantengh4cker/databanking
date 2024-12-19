"use client";
import React, { useState, useEffect } from "react";
import { getQuestionsByReviewerId } from "@/actions/college.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Question, Reviewer } from "@/lib/types";
import Loading from "../Loading/Loading";
import { AddDataModal } from "@/components/modal/AddDataModal";
import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import AddReviewerQuestion from "@/components/forms/AddReviewerQuestion";

interface ReviewerQuestionProps {
  reviewer: Reviewer;
}

export default function ReviewerQuestions({ reviewer }: ReviewerQuestionProps) {
  const [questionsData, setQuestionData] = useState<Question[] | null>(null);
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );
  useEffect(() => {
    async function handleGetQuestions() {
      const res = await getQuestionsByReviewerId(reviewer.id);
      if (res) {
        setQuestionData(res.questions);
        console.log(res.questions);
      } else {
        setQuestionData([]);
      }
    }
    handleGetQuestions();
  }, [reviewer.id]);

  return (
    <div className="w-full flex flex-col gap-5 [&_h1]:text-2xl [&_h1]:font-semibold">
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Subtopic</TableCell>
              <TableCell className="text-right">Action</TableCell>
            </TableRow>
          </TableHeader>
          {questionsData ? (
            questionsData.length > 0 ? (
              <TableBody>
                {questionsData.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`transition-all duration-300 `}
                  >
                    <TableCell>{row.question_content}</TableCell>
                    <TableCell>{row.subtopic_id}</TableCell>
                    <TableCell className="text-right">
                      <AddDataModal
                        title={"Question Info"}
                        buttonTitle={"View Question"}
                        college={collegeData}
                      >
                        <AddReviewerQuestion
                          reviewer={reviewer}
                          defaultValues={row}
                        />
                      </AddDataModal>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p>No question for this review material yet</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Loading />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </main>
    </div>
  );
}
