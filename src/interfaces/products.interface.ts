import { IBrand } from "./brand.interface"
import { ICategory } from "./category.interface"
import { IPagination } from "./pagination.interface"
import { ISubcategory } from "./subcategory.interface"

export interface IProductsResponse {
  results: number
  metadata: IPagination
  data: IProduct[]
}



export interface IProduct {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}




