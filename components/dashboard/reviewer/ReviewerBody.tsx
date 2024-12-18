'use client'
import { useChooseCollege } from "@/app/(custom_hooks)/useChooseCollege";
import AddReviewerQuestion from "@/components/forms/AddReviewerQuestion";
import AddSubtopicForm from "@/components/forms/AddSubtopicForm";
import AddTopicForm from "@/components/forms/AddTopicForm";
import { AddDataModal } from "@/components/modal/AddDataModal";
import { Reviewer } from "@/lib/types";
import React, { useState } from "react";
import ReviewerQuestions from "./ReviewerQuestions";
import Topics from "./Topics";
import { Loader2 } from "lucide-react";

interface ReviewerBodyProps {
  reviewer: Reviewer;
}
export default function ReviewerBody({ reviewer }: ReviewerBodyProps) {

  
  const collegeData = useChooseCollege(
    reviewer.college_id,
    reviewer.program_id
  );
  const [currentTab, setCurrentTab] = useState<string>('questions')
  
  if(!reviewer){
    return <Loader2/>
  }
  return (
    <div>
      <header className="w-full flex items-center justify-between gap-10">
        <div className="col flex gap-5"><h1>Questions</h1>
        <AddDataModal
          title="Add Question"
          buttonTitle="Add Question"
          college={collegeData}
        >
          <AddReviewerQuestion />
        </AddDataModal>
        <AddDataModal
          college={collegeData}
          title="Add Topic"
          buttonTitle="Add Topic"
        >
          <AddTopicForm reviewer={reviewer} />
        </AddDataModal>

        <AddDataModal
          college={collegeData}
          title="Add Topic"
          buttonTitle="Add Subtopic"
        >
          <AddSubtopicForm />
        </AddDataModal></div>
        <div className="col flex gap-5 text-white [&_button]:px-10 [&_button]:py-2 [&_button]:rounded-md">
            <button className={``} style={{backgroundColor: collegeData.color}} onClick={() => setCurrentTab('questions')}>Questions</button>
            <button className={``} style={{backgroundColor: collegeData.color}} onClick={() => setCurrentTab('topics')}>Topics</button>
        </div>
      </header>
      <main>
        {currentTab === "questions" ? <ReviewerQuestions /> : <Topics reviewer={reviewer} />}
      </main>
    </div>
  );
}
