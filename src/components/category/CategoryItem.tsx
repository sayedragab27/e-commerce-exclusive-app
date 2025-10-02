"use client";
import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interfaces/category.interface";

export default function CategoryItem({ category }: { category: ICategory }) {
  return (
    <div className="py-6 px-4 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <Link
        href={`/categories/${category._id}`}
        className="group block overflow-hidden rounded-lg"
      >
        <Image
          src={category.image}
          width={270}
          height={250}
          alt={category.name}
          className="w-full h-[15.625rem] object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </Link>
      <Link href={`/categories/${category._id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
          {category.name}
        </h3>
      </Link>
    </div>
  );
}
