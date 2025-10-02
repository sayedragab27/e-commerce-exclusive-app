"use client";
import { ICategory } from "@/interfaces/category.interface";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { categoriesSliderOptions } from "@/config/swiper.config";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="mb-20">
      <Swiper {...categoriesSliderOptions} className="categories-slider">
        {categories.map((category) => (
          <SwiperSlide
            key={category._id}
            className="flex flex-col items-center"
          >
            <div className="w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link href={`/categories/${category._id}`}>
                <Image
                  src={category.image}
                  width={270}
                  height={250}
                  alt={category.name}
                  className="w-full h-[15.6rem] cusrsor-pointer object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <h3 className="mt-3 text-center font-medium text-gray-800">
              {category.name}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
