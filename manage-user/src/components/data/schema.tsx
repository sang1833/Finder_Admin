import { z } from "zod";

export const userInfoSchema = z.object({
  id: z.number().optional(),
  email: z.string().optional(),
  displayName: z.string().optional(),
  activate: z.boolean().optional(),
  avatar: z.string().optional(),
  lastLogin: z.string().optional()
});

export type UserInfo = z.infer<typeof userInfoSchema>;
