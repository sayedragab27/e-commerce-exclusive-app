import { z } from "zod";
export const registerFormSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }).min(3, {
      message: "Name must be at least 3 characters",
    }),
    email: z.email({ message: "Email is required" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    phone: z.string().regex(/^(?:\+20[0-1]\d{9}|0[0-1]\d{9})$/, {
      message: "Invalid phone number",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"], // Error will show under rePassword field
    message: "Passwords do not match",
  });
export type registerFormType = z.infer<typeof registerFormSchema>;
