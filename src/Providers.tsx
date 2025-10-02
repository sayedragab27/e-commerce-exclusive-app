"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartContextProvider } from "./context/CartContext";
import { WishlistContextProvider } from "./context/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
    // refetchInterval={60} // check session every 60s
    // refetchOnWindowFocus={true}
    >
      <WishlistContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  );
}
