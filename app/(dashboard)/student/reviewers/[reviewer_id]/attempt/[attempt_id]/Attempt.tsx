"use client";
import {
  flagQuestion,
  submitAttempt,
  submitQuestionAnswer,
} from "@/actions/attempt.action";
import ExamNavigation from "@/app/(dashboard)/student/test/components/ExamNavigation";
import { SheetDemo } from "@/app/(dashboard)/student/test/components/Sheet";
import TestBody from "@/app/(dashboard)/student/test/components/TestBody";
import TestHeader from "@/app/(dashboard)/student/test/components/TestHeader";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AttemptType } from "./page";


interface AttemptProps {
  attempt_questions: any;
  attempt: AttemptType;
}

export default function Attempt({ attempt_questions, attempt }: AttemptProps) {
  const navigate = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (attempt_questions?.topics) {
      const allQuestions = attempt_questions.topics.flatMap((topic: any) => {
        const subtopics = topic.subtopics ? Object.values(topic.subtopics) : [];

        return subtopics.flatMap((subtopic: any) => subtopic.questions || []);
      });

      setQuestions(allQuestions);
      console.log("All questions:", allQuestions);
    }
  }, [attempt_questions]);

  const finish_review = () => {
    navigate.push(
      `/student/reviewers/2/attempt/${attempt_questions.attempt_id}/result`
    );
  };

  const submit_attempt = async () => {
    try {
      const res = await submitAttempt(attempt_questions.attempt_id);
      if (res && res.result) {
        console.log(res);
        navigate.push(
          `/student/reviewers/2/attempt/${attempt_questions.attempt_id}/result/`
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handle_answer = async (questionId: string, answer: string | null) => {
    const res = await submitQuestionAnswer(questionId, answer);
    if (res) {
      console.log("ANswered", questionId);
    }
  };
  const handle_flag = async (questionId: string, isFlagged: boolean) => {
    const res = await flagQuestion(questionId, isFlagged);
    if (res) {
      console.log("Flagged", questionId);
    }
  };

  return (
    <div className="flex gap-10 h-full">
      <div className="flex flex-col gap-10 flex-1 h-full">
        <TestHeader />
        <TestBody
          attempt={attempt}
          questions={questions}
          handle_answer={handle_answer}
          handle_flag={handle_flag}
        />
      </div>
      <div className="exam-navigation-container basis-[25%]">
        <ExamNavigation
          attempt={attempt}
          questions={questions}
          submit_attempt={submit_attempt}
          finish_review={finish_review}
        />
      </div>
      <div className="absolute right-0 top-[40%]">
        <SheetDemo attempt={attempt_questions} />
      </div>
    </div>
  );
}
