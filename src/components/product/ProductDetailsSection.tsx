"use client";
import { IProduct } from "@/interfaces/products.interface";
import { Star } from "lucide-react";
import ProductSlider from "./ProductSlider";
import AddProductToCartBtn from "./AddProductToCartBtn";

export default function ProductDetailsSection({
  product,
}: {
  product: IProduct;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
      {/* Product Images Slider */}
      <div className="lg:col-span-2 w-full">
        <ProductSlider images={product.images} />
      </div>

      {/* Product Info */}
      <div className="lg:col-span-1 flex flex-col">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.title}
        </h1>

        {/* Ratings */}
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
          <span className="text-sm font-semibold text-gray-600">
            {product.ratingsAverage.toFixed(1)} / 5
          </span>
        </div>

        {/* Price */}
        <span className="text-3xl font-semibold text-red-500 mb-6 block">
          ${product.price} EGP
        </span>

        {/* Description */}
        <p className="text-gray-700 text-base mb-6 leading-relaxed border-b border-gray-200 pb-6">
          {product.description}
        </p>

        {/* Add to Cart */}
        <AddProductToCartBtn
          productId={product._id}
          className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
          variant="destructive"
        />

        {/* Optional extra info */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Category: {product.category?.name}</p>
          <p>Brand: {product.brand?.name}</p>
          <p>Stock: {product.quantity} items available</p>
        </div>
      </div>
    </div>
  );
}
