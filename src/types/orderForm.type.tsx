export const checkoutFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    payementMethod: [],
  },
  message: null,
  callBackUrl: "",
};

export type checkoutFormStateType = {
  success: boolean;
  error: checkoutFormValuesType;
  message: string | Error | null;
  callBackUrl: string;
};
export type checkoutFormValuesType = {
  cartId?: string[];
  details?: string[];
  city?: string[];
  phone?: string[];
  payementMethod?: string[];
};
