"use server";

import { getUserToken } from "@/lib/server-utils";

export async function getUserCartItems() {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}/cart`, {
      method: "GET",
      headers: { token: token as string },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch cart items");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeAllCartItems() {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}/cart`, {
      method: "DELETE",
      headers: { token: token as string },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch cart items");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addProductToCart(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}/cart`, {
      method: "POST",
      headers: { token: token as string, "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    console.log("data", data);
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: data.statusMsg || "Failed to add product to cart",
        error: null,
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Product added successfully to your cart",
      error: null,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function removeCartItem(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/cart/${productId}`,
      {
        method: "DELETE",
        headers: { token: token as string, "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        response.statusText || "Failed to remove product from cart"
      );
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateCartQty(productId: string, count: number) {
  const token = await getUserToken();
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/cart/${productId}`,
      {
        method: "PUT",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        response.statusText || "Failed to remove product from cart"
      );
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
