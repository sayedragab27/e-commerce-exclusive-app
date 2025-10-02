"use server";
import { IAddWishlist, IWishlist } from "@/interfaces/Wishlist.interface";
import { getUserToken } from "@/lib/server-utils";

export async function getUserWishlistProducts(): Promise<IWishlist> {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/wishlist`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        // next: { revalidate: 3600 , tags: ['products'] },
      }
    );
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: response.statusText || "Failed to fetch wishlist products",
        error: null,
      };
    }
    const data = await response.json();
    return {
      data: data,
      success: true,
      message: data.message || "Wishlist products fetched successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "Failed to fetch wishlist products",
      error: String(error),
    };
  }
}

export async function handleProductToWishlist(
  productId: string,
  isProductInWishlist: boolean
) {
  if (isProductInWishlist) {
    return removeProductToWishlist(productId);
  } else {
    return addProductToWishlist(productId);
  }
}
export async function addProductToWishlist(
  productId: string
): Promise<IAddWishlist> {
  const token = await getUserToken();
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/wishlist`,
      {
        method: "POST",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: data.statusMsg || "Failed to add product to wishlist",
        error: null,
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Product added successfully to your wishlist",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "Failed to add product to wishlist",
      error: String(error),
    };
  }
}
export async function removeProductToWishlist(
  productId: string
): Promise<IAddWishlist> {
  const token = await getUserToken();
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { token: token as string, "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Failed to remove product from wishlist",
        error: null,
      };
    }
    return {
      data: data,
      success: true,
      message:
        data.message || "Product removed successfully from your wishlist",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "Failed to remove product from  wishlist",
      error: String(error),
    };
  }
}
