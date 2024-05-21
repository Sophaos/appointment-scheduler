import { toast } from "react-toastify";
import { z } from "zod";

export const ClientSchema = z
  .object({
    id: z.number(),
    nickname: z.string().min(2, "The nickname must be at least 2 characters.").optional().or(z.literal("")),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().min(1, "The phone number is required.").optional().or(z.literal("")),
    note: z.string().optional(),
    email: z.string().optional(),
  })
  .partial()
  .refine((data) => {
    if (data.nickname === "" && data.phoneNumber === "") {
      toast.warn("The nickname or phone number is required.");
      return false;
    }
    return true;
  });
