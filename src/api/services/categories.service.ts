export async function getCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        // cache: 'no-cache',
        // next: { revalidate: 0 , tags: ['categories'] },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

export async function getProductCategories(productCategoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productCategoryId}`,
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
    console.log(error);
    return { error: String(error) };
  }
}
export async function getSubCategories(CategoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${CategoryId}/subcategories`,
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
    console.log(error);
    return { error: String(error) };
  }
}
