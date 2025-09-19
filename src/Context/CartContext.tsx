"use client";
import { AddToCart } from "@/CartActions/addToCart";
import { clearCartItemAction } from "@/CartActions/clearCartAction";
import { getUserCartAction } from "@/CartActions/getUserCart";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { updateCartItemAction } from "@/CartActions/updateCartAction";
import { cart } from "@/types/cart.type";

import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext({});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [cartId, setCartId] = useState("");

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCart(id);
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
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

  async function clearCart() {
    try {
      const data = await clearCartItemAction();
      setNumOfCartItems(0);
      setProducts([]);
      setTotalCartPrice(0);
      return data;
    } catch (error) {
      console.log(error);
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
    setCartId( "");
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
