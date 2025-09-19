"use client";

import { AddToWish } from "@/WishListActions/AddToWish";
import { getUserWishAction } from "@/WishListActions/getUserWish";
import { removeWishItemAction } from "@/WishListActions/removeWishItem";
import { toast } from "sonner";

import React, { createContext, useEffect, useState } from "react";

export const wishContext = createContext({});

const WishContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfWishItems, setNumOfWishItems] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToWish(id: string) {
    try {
      const data = await AddToWish(id);
      setNumOfWishItems(0);
      setProducts([]);
      getUserWish();
      setProducts(prev => prev.filter(p => p._id !== id));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeWishItem(id: string) {
    try {
      const data = await removeWishItemAction(id);
      setProducts(prev => prev.filter(p => p._id !== id));

      await getUserWish();

      toast.success("Product removed from wishlist", {
        duration: 3000,
        position: "top-center",
      });

      return data;
    } catch (error) {
      toast.error("Failed to remove product", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  async function getUserWish() {
    setIsLoading(true);
    try {
      const data = await getUserWishAction();
      const list = data?.data ?? data ?? [];
      setProducts(Array.isArray(list) ? list : []);
      setNumOfWishItems(list.length || 0);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserWish();
  }, []);

  return (
    <wishContext.Provider
      value={{
        numOfWishItems,
        products,
        isLoading,
        addProductToWish,
        removeWishItem,
        getUserWish,
      }}
    >
      {children}
    </wishContext.Provider>
  );
};

export default WishContextProvider;
