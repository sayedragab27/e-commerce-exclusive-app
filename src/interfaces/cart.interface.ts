import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { ISubcategory } from "./subcategory.interface";

export interface ICartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: Icart;
}

export interface Icart {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface ICartProduct {
  count: number;
  _id: string;
  product: ICartProductDetails;
  price: number;
}

export interface ICartProductDetails {
  subcategory: ISubcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  id: string;
}
