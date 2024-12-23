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
  topic_id: z.number().min(0)
})

export const addQuestionSchema = z.object({
  topic_id: z.number().nullable(),
  subtopic_id: z.number().nullable(),
  question_content: z.string().nonempty("Question is required"),
  correct_answer: z.string().nonempty("Correct answer is required"),
  question_point: z.string().nonempty("Question point is required"),
  reviewer_id: z.number(),
  choices: z
  .array(z.object({
      choice_index: z.enum(["A", "B", "C", "D"]),
      choice_content: z.string().nonempty("Choice content cannot be empty")
    })
  )
  .refine(
    (choices) => choices.length >= 2 && choices.length <= 4,
    "Choices must have between 2 and 4 entries"
  )
  .refine(
    (choices) => {
     
      const indices = choices.map(choice => choice.choice_index);
      return new Set(indices).size === indices.length;
    },
    "Each choice must have a unique index"
  ),
})
