"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  const [pagination, setPaginate] = useState<any>(null);
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );
  const handleGetQuestions = useCallback(async (page: number) => {
    const res = await getQuestionsByReviewerId(reviewer.id, page);
    if (res) {
      setQuestionData(res.questions);
      setPaginate(res.pagination);
    } else {
      setQuestionData([]);
    }
  }, [reviewer.id]);
  
  
  useEffect(() => {
    handleGetQuestions(1); 
  }, [reviewer.id, handleGetQuestions]);

  const buttons = [];
for (let i = 1; i <= pagination?.total_pages; i++) {
  buttons.push(
    <button
      className="bg-[#320000] hover:bg-[#720000] text-white rounded-md p-2"
      key={i}
      onClick={() => handleGetQuestions(i)} 
    >
      {i}
    </button>
  );
}
  
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
      <footer className="flex  justify-between">
       <div className="button flex gap-5">{buttons}</div>
      <div className="total-pages flex flex-col items-end"> <p>Total Pages</p>
      {pagination?.total_pages}</div>
      </footer>
    </div>
  );
}
