import { z } from "zod";

export const testSpecificationSchema = z.object({
  user_id: z.number().min(0, 'User ID is required'),
  reviewer_id: z.number().min(0, 'Reviewer ID is required'),
  status: z.string().default("pending"),
  score: z.number().min(0),
  topic_id: z
  .array(z.string())
  .nonempty({ message: "At least 1 topic must be selected" }),
  subtopic_id: z
  .array(z.string())
  .nonempty({ message: "At least 1 subtopic must be selected" }),
  time_limit: z
    .number()
    .min(30, "Minimum time limit is 30 minutes")
    .max(120, "Maximum time limit is 2 hours"),
  question_amount: z.number().min(10, "Minimum number of items are 10").max(100, 'Max number of items is 100') ,
});
