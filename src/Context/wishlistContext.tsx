"use client";

import { AddToWish } from "@/WishListActions/AddToWish";
import { getClientUserWish } from "@/WishListActions/getClientUserWish";
import { removeWishItemAction } from "@/WishListActions/removeWishItem";
import { wishproduct } from "@/types/wish.type";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import React, { createContext, useEffect, useState } from "react";

/**
 * Small generic API response shape used for non-wish-specific endpoints.
 */
type ApiResponse<T = unknown> = {
  status: string;
  message?: string;
  data?: T;
};

type WishContextType = {
  numOfWishItems: number;
  products: wishproduct[];
  isLoading: boolean;
  addProductToWish: (id: string) => Promise<ApiResponse | undefined>;
  removeWishItem: (id: string) => Promise<ApiResponse | undefined>;
  getUserWish: () => Promise<void>;
};

export const wishContext = createContext<WishContextType>({
  numOfWishItems: 0,
  products: [],
  isLoading: false,
  addProductToWish: async () => undefined,
  removeWishItem: async () => undefined,
  getUserWish: async () => {},
});

const WishContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [numOfWishItems, setNumOfWishItems] = useState(0);
  const [products, setProducts] = useState<wishproduct[]>([]);
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
    } catch {
      toast.error("Failed to remove product", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  async function getUserWish() {
    setIsLoading(true);
    try {
      const data = await getClientUserWish();
      const list = data?.data ?? [];
      setProducts(Array.isArray(list) ? list : []);
      setNumOfWishItems(Array.isArray(list) ? list.length : 0);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getUserWish();
    }
  }, [status]);

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
