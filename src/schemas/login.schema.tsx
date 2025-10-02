import { z } from "zod";
export const loginFormSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});
export type loginFormType = z.infer<typeof loginFormSchema>;
