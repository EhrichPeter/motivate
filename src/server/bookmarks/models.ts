import { z } from 'zod';

export const toggleBookMarkSchema = z.object({
  quote_id: z.number(),
});
