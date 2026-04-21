import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSignIpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});