export async function getProducts(limit = 40) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`,
      {
        cache: "no-cache",
        // next: { revalidate: 3600 , tags: ['products'] },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getProductDetails(productId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
      {
        cache: "no-cache",
        // next: { revalidate: 3600 , tags: ['products'] },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch productDetails");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: String(error) };
  }
}
