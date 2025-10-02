"use server";
import { getUserToken } from "@/lib/server-utils";

import { updatePasswordFormSchema } from "@/schemas/update-password.schema";
import { formStateType, IdataResponse } from "@/types/form.type";

export async function handleChangePassword(
  prevState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const formValues = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };
  const token = await getUserToken();

  const parsedData = updatePasswordFormSchema.safeParse(formValues);
  if (!parsedData.success) {
    return {
      data: null,
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      // error: z.treeifyError(parsedData.error).properties,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        error: {},
        message: data.message,
      };
    }

    // Return a success state
    return {
      success: true,
      data: data,
      error: {},
      message: "Password Updated successfully.",
    };
  } catch (error) {
    // Return an error state
    return {
      data: null,
      success: false,
      error: {},
      message: (error as Error).message,
    };
  }
}
