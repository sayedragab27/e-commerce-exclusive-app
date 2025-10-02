import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useWihlist } from "@/context/WishlistContext";
import { handleProductToWishlist } from "@/api/services/wishlist.service";

export default function AddProductToWishlistBt({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const { wishlistDetails, fetchWishListProducts } = useWihlist();
  const isProductInWishlist: boolean =
    wishlistDetails?.data?.data?.some((product) => product._id === productId) ??
    false;
  async function handleAddProductToWishlist(
    productId: string,
    isProductInWishlist: boolean
  ) {
    const res = await handleProductToWishlist(productId, isProductInWishlist);

    if (res?.success) {
      await fetchWishListProducts();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  }

  return (
    <button
      onClick={() => handleAddProductToWishlist(productId, isProductInWishlist)}
    >
      <Heart
        className="cursor-pointer text-red-500"
        fill={isProductInWishlist ? "red" : "none"}
      />
    </button>
  );
}
