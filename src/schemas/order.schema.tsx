import { z } from "zod";
export const checkoutFormSchema = z.object({
  cartId: z.string(),
  details: z.string().nonempty({ message: "address is required" }).min(3, {
    message: "Name must be at least 3 characters",
  }),
  city: z.string().nonempty({ message: "city is required" }).min(3, {
    message: "Name must be at least 3 characters",
  }),
  phone: z.string().regex(/^(?:\+20[0-1]\d{9}|0[0-1]\d{9})$/, {
    message: "Invalid phone number",
  }),
  payementMethod: z.enum(["cash", "card"]),
});
export type checkoutFormType = z.infer<typeof checkoutFormSchema>;
