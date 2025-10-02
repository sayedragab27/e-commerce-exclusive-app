export const formState = {
  success: false,
  error: {},
  message: null,
};
export interface IdataResponse {
  message: string;
  user: IUser;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
}
export type formStateType = {
  data?: IdataResponse | null;
  success: boolean;
  error: formValuesType;
  message: string | null;
};
export type formValuesType = {
  name?: string[];
  email?: string[];
  password?: string[];
  rePassword?: string[];
  phone?: string[];
  currentPassword?: string[];
};
