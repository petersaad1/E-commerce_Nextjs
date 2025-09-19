"use client";
import { AddToCart } from "@/CartActions/addToCart";
import { clearCartItemAction } from "@/CartActions/clearCartAction";
import { getUserCartAction } from "@/CartActions/getUserCart";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { updateCartItemAction } from "@/CartActions/updateCartAction";
import { cart, cartProduct } from "@/types/cart.type";

import React, { createContext, useEffect, useState } from "react";

/**
 * Small generic API response shape used for non-cart-specific endpoints.
 * Keep `data` typed as `unknown` to avoid `any` while still allowing callers
 * to narrow it when needed.
 */
type ApiResponse<T = unknown> = {
  status: string;
  message?: string;
  data?: T;
};

type CartContextType = {
  numOfCartItems: number;
  totalCartPrice: number;
  products: cartProduct[];
  isloading: boolean;
  addProductToCart: (id: string) => Promise<ApiResponse | undefined>;
  removeCartItem: (id: string) => Promise<cart | undefined>;
  updateCartItem: (id: string, count: number) => Promise<cart | undefined>;
  clearCart: () => Promise<ApiResponse | undefined>;
  cartId: string;
  afterPayment: () => void;
};

export const cartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  totalCartPrice: 0,
  products: [],
  isloading: false,
  addProductToCart: async (_id: string) => undefined,
  removeCartItem: async (_id: string) => undefined,
  updateCartItem: async (_id: string, _count: number) => undefined,
  clearCart: async () => undefined,
  cartId: "",
  afterPayment: () => {},
});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<cartProduct[]>([]);
  const [isloading, setisLoading] = useState(false);
  const [cartId, setCartId] = useState("");

  async function addProductToCart(id: string): Promise<ApiResponse | undefined> {
    try {
      const data = await AddToCart(id);
      getUserCart();
      return data as ApiResponse | undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data: cart = await removeCartItemAction(id);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(id: string, count: number) {
    try {
      const data: cart = await updateCartItemAction(id, count);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart(): Promise<ApiResponse | undefined> {
    try {
      const data = await clearCartItemAction();
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      return data as ApiResponse | undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getUserCart() {
    setisLoading(true);
    try {
      const data: cart = await getUserCartAction();
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }

  function afterPayment() {
    setNumOfCartItems(0);
    setProducts([]);
    setTotalCartPrice(0);
    setCartId("");
  }

  useEffect(function () {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        products,
        isloading,
        addProductToCart,
        removeCartItem,
        updateCartItem,
        clearCart,
        cartId,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;