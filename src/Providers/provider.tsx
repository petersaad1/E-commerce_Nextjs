"use client";
import CartContextProvider from "@/Context/CartContext";
import WishContextProvider from "@/Context/wishlistContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </WishContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}

export default Provider;
