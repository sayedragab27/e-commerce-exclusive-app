"use client";
import Image from "next/image";
import { IBrand } from "@/interfaces/brand.interface";

export default function BrandItem({ brand }: { brand: IBrand }) {
  return (
    <div className="py-6 px-4 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <Image
        src={brand.image}
        width={270}
        height={250}
        alt={brand.name}
        className="w-full h-[15.625rem] object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
        priority
      />

      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
        {brand.name}
      </h3>
    </div>
  );
}
