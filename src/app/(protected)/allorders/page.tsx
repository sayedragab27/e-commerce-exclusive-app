"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserOrders } from "@/api/services/orders.service";
import { OrdersType } from "@/interfaces/orders.interface";
import { CheckCircle, XCircle, Truck, Clock } from "lucide-react";

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
        {orders && orders.length > 0 ? (
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Orders Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader className="bg-gray-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="w-[120px]">Order ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow
                        key={order._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-semibold">
                          #{order.id}
                        </TableCell>

                        {/* User Info */}
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.user.email}
                            </p>
                          </div>
                        </TableCell>

                        {/* Items */}
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.cartItems.slice(0, 2).map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-2 text-xs"
                              >
                                <Image
                                  src={item.product.imageCover}
                                  alt={item.product.title}
                                  width={28}
                                  height={28}
                                  className="rounded-md object-cover"
                                />
                                <span className="truncate max-w-[120px]">
                                  {item.product.title}
                                </span>
                              </div>
                            ))}
                            {order.cartItems.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{order.cartItems.length - 2} more
                              </span>
                            )}
                          </div>
                        </TableCell>

                        {/* Total */}
                        <TableCell className="font-semibold">
                          {order.totalOrderPrice} EGP
                        </TableCell>

                        {/* Payment */}
                        <TableCell>
                          {order.isPaid ? (
                            <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Paid
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Unpaid
                            </Badge>
                          )}
                        </TableCell>

                        {/* Delivery */}
                        <TableCell>
                          {order.isDelivered ? (
                            <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                              <Truck className="w-3 h-3" /> Delivered
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Pending
                            </Badge>
                          )}
                        </TableCell>

                        {/* Date */}
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold text-center">No Orders Found</h1>
            <Button asChild variant="outline">
              <Link href={"/products"}>Return to Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
