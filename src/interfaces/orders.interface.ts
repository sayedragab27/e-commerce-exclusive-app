import { ICartProduct } from "./cart.interface";

export type OrdersType = IOrdersResponse[];

export interface IOrdersResponse {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: ICartProduct[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
