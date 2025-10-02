import { IProduct } from "./products.interface";

export interface IWishlistResponse {
  status: string;
  count: number;
  data: IProduct[];
}
export interface IWishlist {
  data: IWishlistResponse | null;
  success: boolean;
  message: string;
  error: string | null;
}
export interface IWishlistContext {
  wishlistDetails: IWishlist | null;
  setWishlistDetails: React.Dispatch<React.SetStateAction<IWishlist | null>>;
  fetchWishListProducts: () => Promise<void>;
}

export interface IAddWishlistResponse {
  status: string;
  message: string;
  data: string[];
}
export interface IAddWishlist {
  data: IAddWishlistResponse | null;
  success: boolean;
  message: string;
  error: string | null;
}
