"use client";
import React, { useState, useEffect } from "react";
import { getQuestions } from "@/actions/college.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Question } from "@/lib/types";

export default function ReviewerQuestions() {
  const [questionsData, setQuestionData] = useState<Question[] | []>([]);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function handleGetQuestions() {
      const res = await getQuestions();
      setQuestionData(res.questions);
    }
    handleGetQuestions();
  }, []);

  const toggleQuestionDetails = (id: number) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-5 [&_h1]:text-2xl [&_h1]:font-semibold">
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Subtopic</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionsData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  className={`transition-all duration-300 ${
                    expandedQuestionId === row.id ? "h-auto" : "h-16"
                  }`}
                >
                  <TableCell>{row.question_content}</TableCell>
                  <TableCell>{row.subtopic_id}</TableCell>
                  <TableCell>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => toggleQuestionDetails(row.id)}
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow className="flex-1">
                  {expandedQuestionId === row.id && (
                    <div className="mt-2 p-2 bg-gray-100 rounded flex flex-col">
                      <h3 className="font-semibold flex-1">Choices</h3>
                      <ul>
                        {row.choices?.map((choice, idx) => (
                          <li key={idx} className="flex gap-3 py-1">
                            <span>{choice.choice_index}</span>:{" "}
                            <span>{choice.choice_content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
