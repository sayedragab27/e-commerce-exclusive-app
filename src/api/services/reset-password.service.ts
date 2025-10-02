"use server";
import {
  emailFormSchema,
  emailFormSchemaType,
  resetPasswordFormSchema,

  // veirfyCodeFormSchema,
  // veirfyCodeFormSchemaType,
} from "@/schemas/reset-password.schema";
import { resetPasswordFormStateType } from "@/types/reset-password.type";

export async function handleResetPassword(
  prevState: resetPasswordFormStateType,
  formData: FormData
): Promise<resetPasswordFormStateType> {
  try {
    const email = formData.get("email");
    const newPassword = formData.get("newPassword");
    const resetCode = formData.get("resetCode");

    const parsedData = resetPasswordFormSchema.safeParse({
      email,
      newPassword,
      resetCode,
    });

    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error.flatten().fieldErrors,
        message: null,
      };
    }

    // validate code from backend or DB
    const codeStatus = await validateResetPasswordCode(resetCode as string);

    if (!codeStatus.success) {
      return {
        success: false,
        error: null,
        message: "Invalid reset code or code is expired",
      };
    }
    const passwordStatus = await updatePassword(
      email as string,
      newPassword as string
    );

    if (!passwordStatus.success) {
      return {
        success: false,
        error: null,
        message: "Invalid reset code or code is expired",
      };
    }
    return {
      success: true,
      error: null,
      message: "Password reset successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: null,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
async function updatePassword(email: string, newPassword: string) {
  {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/auth/resetPassword`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to verify reset code");
    }
    if (data.token.length > 0) {
      return {
        success: true,
        message: data.message || "Password reset successfully",
        error: null,
      };
    } else {
      return {
        success: false,
        message: data.message || "Something went wrong during password reset",
        error: null,
      };
    }
  }
}

export async function validateResetPasswordCode(resetCode: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/auth/verifyResetCode`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to verify reset code");
    }
    if (data.status === "Success") {
      return {
        success: true,
        message: data.message || "Code is valid",
        error: null,
      };
    } else {
      return {
        success: false,
        message: data.message || "Code is not valid",
        error: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: null,
      error: String(error),
    };
  }
}
export async function sendResetCode(
  email: string
): Promise<resetPasswordFormStateType> {
  const parsedData = emailFormSchema.safeParse({ email });
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      //   error: z.treeifyError(parsedData.error).properties,
      message: null,
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/auth/forgotPasswords`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to verify reset code");
    }
    if (data.statusMsg === "success") {
      return {
        success: true,
        message: data.message,
        error: null,
      };
    } else {
      return {
        success: false,
        message: data.message,
        error: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      error: null,
    };
  }
}
