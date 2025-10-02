import { getUserCartItems } from "@/api/services/cart.service";
import { ICartResponse } from "@/interfaces/cart.interface";
import { ICartContext } from "@/interfaces/cartContext.interface";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<ICartContext | null>(null);

import React from "react";

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);
  const { data: session } = useSession();
  const email = session?.user?.email;
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Get the cart details from the backend and set the state with the returned data
   * This function is called when the user is logged in and the cart details are not available in the state
   * It fetches the cart items from the backend and sets the state with the returned data
   * @returns {Promise<void>} - a promise that resolves when the state is set with the cart details
   */

  /*******  043b714a-2722-41f7-b431-a281ee8d0160  *******/
  async function getCartDetails() {
    const data = await getUserCartItems();
    setCartDetails(data);
  }
  useEffect(() => {
    if (email && !cartDetails) {
      getCartDetails();
    }
  }, [email, cartDetails]);
  return (
    <CartContext.Provider
      value={{ cartDetails, setCartDetails, getCartDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
}
