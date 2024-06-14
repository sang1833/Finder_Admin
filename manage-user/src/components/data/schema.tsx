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

export const ItemTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  updatedDate: z.string().optional()
});

export type ItemType = z.infer<typeof ItemTypeSchema>;
