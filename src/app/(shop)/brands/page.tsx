import React from "react";
import { getBrands } from "@/api/services/brands.service";
import { IBrand } from "@/interfaces/brand.interface";
import BrandItem from "@/components/brand/brandItem";

export default async function BrandsPage() {
  const { data: barnds }: { data: IBrand[] } = await getBrands();
  return (
    <>
      <section className="px-10 py-10 lg:px-40 lg:pb-20">
        <div className="container mx-auto">
          {/* <SectionTitle title='Products' subtitle='Explore Our Products'/> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {barnds &&
              barnds.map((brand) => (
                <BrandItem key={brand._id} brand={brand} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
