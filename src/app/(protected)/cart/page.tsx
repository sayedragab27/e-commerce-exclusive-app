"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  removeAllCartItems,
  removeCartItem,
  updateCartQty,
} from "@/api/services/cart.service";
import { toast } from "sonner";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItems() {
    const res = await removeAllCartItems();
    if (res.message === "success") {
      toast.success("Cart Items Removed Successfully");
      setCartDetails(null);
    } else {
      toast.error(
        res.message || "Something went wrong during removing cart items"
      );
    }
  }
  async function removeProductItem(productId: string) {
    const res = await removeCartItem(productId);
    if (res.status === "success") {
      toast.success("Cart Item Removed Successfully");
      setCartDetails(res);
    } else {
      toast.error("Something went wrong during removing cart items");
    }
  }
  async function updateProductCartQty(productId: string, count: number) {
    const res = await updateCartQty(productId, count);
    if (res.status === "success") {
      toast.success("Cart Item Updated Successfully");
      setCartDetails(res);
    } else {
      toast.error("Something went wrong during updating cart items");
    }
  }
  return (
    <section className="py-4 px-40">
      <div className="container mx-auto">
        {cartDetails && cartDetails?.data.products.length > 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-8 px-10 py-8">
                <TableHeader className=" ">
                  <TableRow>
                    <TableHead className="">Products</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails?.data?.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3 relative">
                          {/* Product Image */}
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={product.product.imageCover}
                              width={48}
                              height={48}
                              alt={product.product.title}
                              className="rounded-md object-cover"
                            />

                            {/* Remove Button */}
                            <Badge className="absolute -top-1 -right-1 p-0.5 w-4 h-4 flex items-center justify-center bg-red-600 hover:bg-red-700 cursor-pointer rounded-full">
                              <X
                                onClick={() =>
                                  removeProductItem(product.product._id)
                                }
                                className="w-2.5 h-2.5 text-white"
                                strokeWidth={3}
                              />
                            </Badge>
                          </div>

                          {/* Product Title */}
                          <h3 className="text-sm md:text-base font-medium line-clamp-1">
                            {product.product.title}
                          </h3>
                        </div>
                      </TableCell>

                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div>
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              updateProductCartQty(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="px-4">{product.count}</span>
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              updateProductCartQty(
                                product.product._id,
                                product.count + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.count * product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-16">
                <Button variant={"outline"}>
                  <Link href={"/products"}>Return to Shop</Link>
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={removeCartItems}
                  className="cursor-pointer"
                >
                  Remove All
                </Button>
              </div>
            </section>
            <section className="flex items-center justify-between">
              <div className="flex items-center w-5/12 gap-x-4">
                <Input type="text" placeholder="Apply Coupon" />
                <Button variant={"destructive"}>Apply Coupon</Button>
              </div>
              <div className="border border-gray-800 w-5/12 px-6 py-8">
                <h3 className="text-xl font-bold mb-6">Cart Total</h3>
                <ul className="divide divide-y divide-gray-400">
                  <li className="flex items-center justify-between py-6">
                    <span className="font-semibold">Subtotal:</span>
                    <span>{cartDetails?.data.totalCartPrice}</span>
                  </li>
                  <li className="flex items-center justify-between py-6">
                    <span className="font-semibold">Shipping:</span>
                    <span>Free</span>
                  </li>
                  <li className="flex items-center justify-between py-6">
                    <span className="font-semibold">Total:</span>
                    <span>{cartDetails?.data.totalCartPrice}</span>
                  </li>
                </ul>
                <div className="flex items-center justify-center">
                  <Button variant={"destructive"} asChild>
                    <Link href={`/checkout`}>Procced to Checkout</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-center">
                Your Cart is Empty
              </h1>
              <Button variant={"outline"}>
                <Link href={"/products"}>Return to Shop</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
