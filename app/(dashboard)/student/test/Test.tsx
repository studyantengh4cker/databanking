import React from "react";
import TestHeader from "./components/TestHeader";
import TestBody from "./components/TestBody";
import ExamNavigation from "./components/ExamNavigation";

export default function Test() {
 
  const DummyTest = [
    {
      id: 1,
      question: {
        id: 1,
        question_content: "How is your day",
        question_choices: [
          {choice_index: 'A', choice_content: 'Yes'},
          {choice_index: 'B', choice_content: 'No'},
          {choice_index: 'C', choice_content: 'Maybe'},
          {choice_index: 'D', choice_content: 'Hmmmm'},
        ]
      },
      status: "Ongoing"
    },
    {
      id: 2,
      question: {
        id: 2,
        question_content: "How is your dayss",
        question_choices: [
          {choice_index: 'A', choice_content: 'Yes'},
          {choice_index: 'B', choice_content: 'No'},
          {choice_index: 'C', choice_content: 'Maybe'},
          {choice_index: 'D', choice_content: 'Hmmmm'},
        ]
      },
      status: "Ongoing"
    },
  ]

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-10 flex-1">
        <TestHeader />
        <TestBody test_items={DummyTest} />
      </div>
      <div className="exam-navigation-container">
        <ExamNavigation />
      </div>
    </div>
  );
}
