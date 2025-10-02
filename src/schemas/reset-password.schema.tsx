import { z } from "zod";
export const resetPasswordFormSchema = z.object({
  email: z.email({ message: "Email is required" }),
  newPassword: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  resetCode: z
    .string()
    .nonempty({ message: "code is required, Please check your gmail" }),
});
export type resetPasswordFormSchemaType = z.infer<
  typeof resetPasswordFormSchema
>;

export const emailFormSchema = z.object({
  email: z.email({ message: "Email is required" }),
});
export type emailFormSchemaType = z.infer<typeof emailFormSchema>;
// export const veirfyCodeFormSchema = z.object({
//   resetCode: z
//     .string()
//     .nonempty({ message: "code is required, Please check your gmail" }),
// });
// export type veirfyCodeFormSchemaType = z.infer<typeof veirfyCodeFormSchema>;
