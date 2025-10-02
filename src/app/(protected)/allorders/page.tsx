"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getUserOrders } from "@/api/services/orders.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrdersType } from "@/interfaces/orders.interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AllordersPage() {
  const [orders, setOrders] = useState<OrdersType>([]);
  useEffect(() => {
    async function fetchOrders() {
      const response = await getUserOrders();
      if (response.success) {
        setOrders(response.data);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
    fetchOrders();
  }, []);
  return (
    <section className="px-10 py-10 lg:px-40 lg:pb-20 mt-3 lg:mt-2">
      <div className="container mx-auto">
        {orders ? (
          <Card className="w-full shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of all customer orders.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Delivery Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders &&
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{order.user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.user.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            {order.cartItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-3 text-sm"
                              >
                                <Image
                                  src={item.product.imageCover}
                                  alt={item.product.title}
                                  width={40}
                                  height={40}
                                  className="rounded-md object-cover"
                                />
                                <div>
                                  <p>{item.product.title}</p>
                                  <p className="text-muted-foreground">
                                    x{item.count} – {item.price} EGP
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {order.totalOrderPrice} EGP
                        </TableCell>
                        <TableCell>{order.paymentMethodType}</TableCell>
                        <TableCell>
                          {order.isPaid ? (
                            <span className="text-green-600 font-medium block mx-auto ">
                              Paid
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium  block mx-auto">
                              Unpaid
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {order.isDelivered ? (
                            <span className="text-green-600 font-medium  block mx-auto">
                              Delivered
                            </span>
                          ) : (
                            <span className="text-orange-600 font-medium block mx-auto">
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
