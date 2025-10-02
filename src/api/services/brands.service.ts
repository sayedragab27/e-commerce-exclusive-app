export async function getBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
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
