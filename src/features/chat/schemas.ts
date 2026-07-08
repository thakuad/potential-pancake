import { z } from "zod";

export const MAX_MESSAGE_LENGTH = 4000;

export const messageSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Message is empty")
    .max(MAX_MESSAGE_LENGTH, "Message is too long"),
  isUrgent: z.boolean(),
});

export type MessageValues = z.infer<typeof messageSchema>;
