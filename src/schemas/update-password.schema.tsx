import { z } from "zod";
export const updatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"], // Error will show under rePassword field
    message: "Passwords do not match",
  });
export type updatePasswordFormSchemaType = z.infer<
  typeof updatePasswordFormSchema
>;
