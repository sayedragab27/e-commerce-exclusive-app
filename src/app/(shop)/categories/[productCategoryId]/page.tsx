import { getProductCategories } from "@/api/services/categories.service";
import ProductItem from "@/components/product/ProductItem";
import { IProduct } from "@/interfaces/products.interface";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productCategoryId: string }>;
}) {
  const { productCategoryId } = await params;

  const { data: products }: { data: IProduct[] } = await getProductCategories(
    productCategoryId
  );

  return (
    <section className="px-40 pb-20">
      <div className="container mx-auto">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No products found in this category.
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later or browse other categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
