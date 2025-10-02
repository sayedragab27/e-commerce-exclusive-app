"use server";
import { registerFormSchema } from "@/schemas/register.schema";
import { formStateType } from "@/types/form.type";
import z from "zod";

export async function handRegisterUp(
  prevState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = registerFormSchema.safeParse(formValues);
  // const x = z.treeifyError(parsedData.error);
  // console.log("parsedData", x.properties);
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      // error: z.treeifyError(parsedData.error).properties,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }

    // Return a success state
    return {
      success: true,
      error: {},
      message: "Registration successful.",
    };
  } catch (error) {
    // Return an error state
    return {
      success: false,
      error: {},
      message: (error as Error).message,
    };
  }
}
