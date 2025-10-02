export const resetPasswordFormState = {
  success: false,
  error: {
    email: [],
    newPassword: [],
    resetCode: [],
  },
  message: null,
};
export const verifyCodeFormState = {
  success: false,
  error: {
    email: [],
    resetCode: [],
  },
  message: null,
};

export type resetPasswordFormStateType = {
  success: boolean;
  error: resetPasswordFormValuesType | null;
  message: string | null;
};
export type resetPasswordFormValuesType = {
  email?: string[];
  newPassword?: string[];
  resetCode?: string[];
};
