"use client";
import { IProduct } from "@/interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddProductToCartBtn from "./AddProductToCartBtn";
import AddProductToWishlistBtn from "./AddProductToWishlist";
import { useSession } from "next-auth/react";

export default function ProductItem({ product }: { product: IProduct }) {
  const { status } = useSession();
  return (
    <div className="py-6 px-4 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative overflow-hidden group rounded-lg">
        <Link href={`/products/${product._id}`} className="block">
          <Image
            src={product.imageCover}
            width={270}
            height={250}
            alt={product.title}
            className="w-full h-[15.625rem] object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {status === "authenticated" && (
          <AddProductToCartBtn
            productId={product._id}
            className="absolute bottom-0 w-full translate-y-full bg-black text-white opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg mt-2 line-clamp-1 font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        {status === "authenticated" && (
          <AddProductToWishlistBtn productId={product._id} />
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="font-medium text-red-500">${product.price} EGP</span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
