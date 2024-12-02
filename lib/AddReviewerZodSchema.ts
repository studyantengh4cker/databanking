import { z } from "zod";

export const addReviewerSchema = z
  .object({
    reviewer_name: z.string().nonempty("Reviewer name is required"),
    reviewer_description: z.string().nonempty("Description is required"),
    school_year: z.string().nonempty("School Year is required"),
    college_id: z.string().nonempty("College is required"),
    program_id: z.string().nonempty("Program is required"),
  })
  
export const  addTopicSchema = z.object({
  topic_name: z.string().nonempty("Topic name is required"),
  college_id: z.string().nonempty("College is required"),
  program_id: z.string().nonempty("Program is required"),
})

export const  addSubTopicSchema = z.object({
  subtopic_name: z.string().nonempty("Subtopic name is required"),
  topic_id: z.string().nonempty("Topic is required"),
  college_id: z.string().nonempty("College is required"),
  program_id: z.string().nonempty("Program is required"),
})
  
export const addQuestionSchema = z.object({
  question: z.string().nonempty("Question is required"),
  correct_answer: z.string().nonempty("Question is required"),
  question_point: z.string().nonempty('Question point is required'),
  question_choices: z.string().nonempty("Question is required"),
  topic: z.string().nonempty("Topic is required"),
  subtopic: z.string().nonempty("Subtopic is required"),
})