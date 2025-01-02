// 'use client'
// import React, {useState } from "react";
// import TestHeader from "./components/TestHeader";
// import TestBody from "./components/TestBody";
// import ExamNavigation from "./components/ExamNavigation";
// import { SheetDemo } from "./components/Sheet";

// export default function Test() {
 
//   const DummyTest = [
//     {
//       id: 1,
//       question: {
//         id: 1,
//         question_content: "How is your day?",
//         topic_id: 1,
//         subtopic_id: 101,
//         choices: [
//           { choice_index: "A", choice_content: "Yes" },
//           { choice_index: "B", choice_content: "No" },
//           { choice_index: "C", choice_content: "Maybe" },
//           { choice_index: "D", choice_content: "Hmmmm" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 2,
//       question: {
//         id: 2,
//         question_content: "What is your favorite color?",
//         topic_id: 1,
//         subtopic_id: 102,
//         choices: [
//           { choice_index: "A", choice_content: "Red" },
//           { choice_index: "B", choice_content: "Blue" },
//           { choice_index: "C", choice_content: "Green" },
//           { choice_index: "D", choice_content: "Yellow" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 3,
//       question: {
//         id: 3,
//         question_content: "Do you like coding?",
//         topic_id: 2,
//         subtopic_id: 201,
//         choices: [
//           { choice_index: "A", choice_content: "Yes" },
//           { choice_index: "B", choice_content: "No" },
//           { choice_index: "C", choice_content: "Sometimes" },
//           { choice_index: "D", choice_content: "Not sure" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 4,
//       question: {
//         id: 4,
//         question_content: "How many hours do you work per day?",
//         topic_id: 2,
//         subtopic_id: 202,
//         choices: [
//           { choice_index: "A", choice_content: "Less than 4" },
//           { choice_index: "B", choice_content: "4-8" },
//           { choice_index: "C", choice_content: "8-12" },
//           { choice_index: "D", choice_content: "More than 12" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 5,
//       question: {
//         id: 5,
//         question_content: "What is your preferred mode of transport?",
//         topic_id: 3,
//         subtopic_id: 301,
//         choices: [
//           { choice_index: "A", choice_content: "Car" },
//           { choice_index: "B", choice_content: "Bike" },
//           { choice_index: "C", choice_content: "Public Transport" },
//           { choice_index: "D", choice_content: "Walking" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 6,
//       question: {
//         id: 6,
//         question_content: "What is your favorite meal of the day?",
//         topic_id: 3,
//         subtopic_id: 302,
//         choices: [
//           { choice_index: "A", choice_content: "Breakfast" },
//           { choice_index: "B", choice_content: "Lunch" },
//           { choice_index: "C", choice_content: "Dinner" },
//           { choice_index: "D", choice_content: "Snack" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 7,
//       question: {
//         id: 7,
//         question_content: "Which season do you prefer?",
//         topic_id: 4,
//         subtopic_id: 401,
//         choices: [
//           { choice_index: "A", choice_content: "Spring" },
//           { choice_index: "B", choice_content: "Summer" },
//           { choice_index: "C", choice_content: "Autumn" },
//           { choice_index: "D", choice_content: "Winter" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 8,
//       question: {
//         id: 8,
//         question_content: "What is your favorite sport?",
//         topic_id: 4,
//         subtopic_id: 402,
//         choices: [
//           { choice_index: "A", choice_content: "Football" },
//           { choice_index: "B", choice_content: "Basketball" },
//           { choice_index: "C", choice_content: "Tennis" },
//           { choice_index: "D", choice_content: "Swimming" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 9,
//       question: {
//         id: 9,
//         question_content: "Do you like pets?",
//         topic_id: 5,
//         subtopic_id: 501,
//         choices: [
//           { choice_index: "A", choice_content: "Yes" },
//           { choice_index: "B", choice_content: "No" },
//           { choice_index: "C", choice_content: "Maybe" },
//           { choice_index: "D", choice_content: "Not sure" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//     {
//       id: 10,
//       question: {
//         id: 10,
//         question_content: "How do you spend your weekends?",
//         topic_id: 5,
//         subtopic_id: 502,
//         choices: [
//           { choice_index: "A", choice_content: "Relaxing at home" },
//           { choice_index: "B", choice_content: "Going out" },
//           { choice_index: "C", choice_content: "Doing chores" },
//           { choice_index: "D", choice_content: "Working" },
//         ],
//         status: "not_answered",
//         isFlagged: false,
//       },
//     },
//   ];
  
//   const [test_items, setTestItems] = useState(DummyTest)

//   const handleAnswer = (questionId: number, status: string) => {
//     setTestItems((prevItems) => {
//       return prevItems.map((item) => {
//         if (item.question.id === questionId) {
//           return {
//             ...item,
//             question: {
//               ...item.question,
//               status,
//             },
//           };
//         }
//         return item;
//       });
//     });
//   };
//   const handleFlag = (questionId: number, isFlagged: boolean) => {
//     setTestItems((prevItems) => {
//       return prevItems.map((item) => {
//         if (item.question.id === questionId) {
//           return {
//             ...item,
//             question: {
//               ...item.question,
//               isFlagged,
//             },
//           };
//         }
//         return item;
//       });
//     });
//   };

//   if(!test_items) return
//   return (
//     <div className="flex gap-10 h-full">
//       <div className="flex flex-col gap-10 flex-1 h-full">
//         <TestHeader />
//         <TestBody test_items={test_items} handle_answer={handleAnswer} handle_flag={handleFlag} />
//       </div>
//       <div className="exam-navigation-container basis-[25%] ">
//         <ExamNavigation test_items={test_items} />
//       </div>
//       <div className="absolute right-0 top-[40%]"><SheetDemo test_items={test_items} /></div>
//     </div>
//   );
// }
