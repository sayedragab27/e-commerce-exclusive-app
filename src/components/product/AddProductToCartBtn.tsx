import { addProductToCart } from "@/api/services/cart.service";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";

export default function AddProductToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const { setCartDetails, getCartDetails } = useCart();
  async function handleAddToCart(productId: string) {
    const res = await addProductToCart(productId);
    if (res?.success === true) {
      setCartDetails(res.data);
      getCartDetails();

      toast.success("Product added to cart successfully");
    } else {
      toast.error(res?.message);
    }
  }
  return (
    <>
      <Button {...props} onClick={() => handleAddToCart(productId)}>
        Add To Cart
      </Button>
    </>
  );
}
