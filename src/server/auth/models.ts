import { z } from "zod";

export const loginWithOtpFormSchema = z.object({
  email: z.string().email(),
});
