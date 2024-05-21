import { z } from "zod";

export const ExpertSchema = z.object({
  id: z.number(),
  nickname: z.string().min(2, "The nickname must be at least 2 characters."),
  color: z.string().min(1, "A color must be selected."),
});
