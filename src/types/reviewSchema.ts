import { z } from "zod";

export const addReviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z
    .string()
    .min(1, "Please add a comment")
    .max(250, "Comment too long"),
});

export type AddReviewSchema = z.infer<typeof addReviewSchema>;
