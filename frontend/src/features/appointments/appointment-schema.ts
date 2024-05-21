import { ExpertSchema } from "features/experts/expert-schema";
import { ClientSchema } from "features/clients/client-schema";
import { ServiceSchema } from "features/services/service-schema";
import { z } from "zod";

export const AppointmentSchema = z.object({
  id: z.number(),
  start: z.date(),
  duration: z.number().gte(30),
  expert: ExpertSchema,
  client: ClientSchema,
  service: ServiceSchema,
  notes: z.string(),
  status: z.string(),
});
