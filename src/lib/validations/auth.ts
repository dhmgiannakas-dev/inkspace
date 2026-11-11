import { z } from "zod";

/** Validates user registration data. */
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),

  email: z
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be at most 72 characters."),
});

export type RegisterInput = z.infer<typeof registerSchema>;