"use server";
import { getUserId, getUserToken } from "@/lib/server-utils";
import { checkoutFormSchema } from "@/schemas/order.schema";
import {
  checkoutFormStateType,
  checkoutFormValuesType,
} from "@/types/orderForm.type";

// {
//     "shippingAddress":{
//         "details": "details",
//         "phone": "01010700999",
//         "city": "Cairo"
//         }
// }
export async function handlePayment(
  prevState: checkoutFormStateType,
  formData: FormData
): Promise<checkoutFormStateType> {
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };
  const cartId = formData.get("cartId");
  const payementMethod = formData.get("payementMethod");
  const parsedData = checkoutFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    payementMethod,
  });
  const token = await getUserToken();
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      // error: z.treeifyError(parsedData.error).properties,
      message: null,
      callBackUrl: "/cart",
    };
  }
  // https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67b210df429eb834606c7a30?url=http://localhost:3000
  const endPoint =
    payementMethod === "cash"
      ? `orders/${cartId}`
      : `orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/${endPoint}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place the order",
        callBackUrl: "/cart",
      };
    }
    // Return a success state
    return {
      success: true,
      error: {},
      message:
        payementMethod === "cash"
          ? "order placed Successfully"
          : "now you have to complete the payement",
      callBackUrl: payementMethod === "cash" ? "/allorders" : data.session.url,
    };
  } catch (error) {
    // Return an error state
    return {
      success: false,
      error: {},
      message: error instanceof Error ? error : "Failed to place the order",
      callBackUrl: "/cart",
    };
  }
}

// https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17
export async function getUserOrders() {
  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: data.statusMsg || "Failed to fetch orders",
        error: null,
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Orders fetched successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "Failed to fetch orders",
      error: error as string,
    };
  }
}
