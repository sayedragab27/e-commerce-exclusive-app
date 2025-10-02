import React from "react";
import { getProducts } from "@/api/services/products.service";
import { IProduct } from "@/interfaces/products.interface";
import ProductItem from "@/components/product/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  return (
    <>
      <section className="px-10 py-10 lg:px-40 lg:pb-20">
        <div className="container mx-auto">
          {/* <SectionTitle title='Products' subtitle='Explore Our Products'/> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {products &&
              products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
