"use client";
import ExamNavigation from "@/app/(dashboard)/student/test/components/ExamNavigation";
import { SheetDemo } from "@/app/(dashboard)/student/test/components/Sheet";
import TestBody from "@/app/(dashboard)/student/test/components/TestBody";
import TestHeader from "@/app/(dashboard)/student/test/components/TestHeader";
import React, { useState, useEffect } from "react";

interface AttemptProps {
  test_items: any;
}

export default function Attempt({ test_items }: AttemptProps) {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (test_items?.topics) {
      const allQuestions = test_items.topics.flatMap((topic: any) => {
        const subtopics = topic.subtopics ? Object.values(topic.subtopics) : [];

        return subtopics.flatMap((subtopic: any) => subtopic.questions || []);
      });

      setQuestions(allQuestions);
      console.log("All questions:", allQuestions);
    }
  }, [test_items]);

  const handle_answer = (questionId: number, status: string) => {
    setQuestions((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            status,
          };
        }
        return item;
      });
    });
  };
  const handle_flag = (questionId: number, isFlagged: boolean) => {
    setQuestions((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === questionId) {
          return {
            ...item,
            isFlagged,
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="flex gap-10 h-full">
      <div className="flex flex-col gap-10 flex-1 h-full">
        <TestHeader />
        <TestBody
          questions={questions}
          handle_answer={handle_answer}
          handle_flag={handle_flag}
        />
      </div>
      <div className="exam-navigation-container basis-[25%]">
        <ExamNavigation questions={questions} />
      </div>
      <div className="absolute right-0 top-[40%]">
        <SheetDemo test_items={test_items} />
      </div>
    </div>
  );
}
