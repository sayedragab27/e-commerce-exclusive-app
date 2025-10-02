import React from "react";
import { getCategories } from "@/api/services/categories.service";
import { ICategory } from "@/interfaces/category.interface";
import CategoryItem from "@/components/category/CategoryItem";

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  return (
    <>
      <section className="px-10 py-10 lg:px-40 lg:pb-20">
        <div className="container mx-auto">
          {/* <SectionTitle title='Products' subtitle='Explore Our Products'/> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {categories &&
              categories.map((categories) => (
                <CategoryItem key={categories._id} category={categories} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
