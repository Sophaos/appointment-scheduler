import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "The name must be at least 1 character."),
  color: z.string().min(1, "A color must be selected."),
  duration: z.number().min(1, "The default duration is required."),
});
