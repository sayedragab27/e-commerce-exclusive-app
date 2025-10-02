import { getUserWishlistProducts } from "@/api/services/wishlist.service";
import { IWishlist, IWishlistContext } from "@/interfaces/Wishlist.interface";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
const WishlistContext = createContext<IWishlistContext | null>(null);
import React from "react";

export function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistDetails, setWishlistDetails] = useState<IWishlist | null>(
    null
  );
  const { data: session } = useSession();
  const email = session?.user?.email;

  // async function addProductToWishlist(productId: string) {}
  async function fetchWishListProducts() {
    const wishListReponse: IWishlist = await getUserWishlistProducts();
    if (wishListReponse) {
      setWishlistDetails(wishListReponse);
    }
  }

  useEffect(() => {
    if (email && !wishlistDetails) {
      fetchWishListProducts();
    }
  }, [email, wishlistDetails]);
  return (
    <WishlistContext.Provider
      value={{ wishlistDetails, setWishlistDetails, fetchWishListProducts }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
export function useWihlist() {
  const whishList = useContext(WishlistContext);
  if (!whishList)
    throw new Error("useWihlist must be used within a WishlistContextProvider");
  return whishList;
}
