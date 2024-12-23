import { z } from "zod";

export const testSpecificationSchema = z.object({
    time_limit: z.number().min(30, "Minimum time limit is not less than 30mins").max(120, "Maximum time limit is 2 hours")
})