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
  topic_description: z.string().nonempty("Description is required"),
  reviewer_id: z.number().optional(),
  program_id: z.string().nonempty("Program is required"),
})

export const  addSubTopicSchema = z.object({
  subtopic_name: z.string().nonempty("Subtopic name is required"),
  subtopic_description: z.string().nonempty("Description is required"),
  topic_id: z.string().nonempty("Topic is required"),
})

export const addQuestionSchema = z.object({
  question_content: z.string().nonempty("Question is required"),
  correct_answer: z.string().nonempty("Correct answer is required"),
  question_point: z.string().nonempty("Question point is required"),
  subtopic_id: z.string().nonempty("Subtopic is required"),
  question_choices: z
    .object({
      a: z.string().nonempty("Choice A cannot be empty"),
      b: z.string().nonempty("Choice B cannot be empty"),
      c: z.string().optional(),
      d: z.string().optional(),
    })
    .refine(
      (choices) => Object.keys(choices).length >= 2 && Object.keys(choices).length <= 4,
      "Choices must have between 2 and 4 entries"
    ),
});
