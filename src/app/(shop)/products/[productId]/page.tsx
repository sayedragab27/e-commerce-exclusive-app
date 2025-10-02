import { getProductDetails } from "@/api/services/products.service";
import ProductDetailsSection from "@/components/product/ProductDetailsSection";
// import ProductDetails from "@/components/product/ProductDetails";
import { IProduct } from "@/interfaces/products.interface";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );

  return (
    <>
      <section className="px-10 py-10 lg:px-40 lg:pb-20">
        <div className="container mx-auto">
          <ProductDetailsSection product={product} />
        </div>
      </section>
    </>
  );
}
