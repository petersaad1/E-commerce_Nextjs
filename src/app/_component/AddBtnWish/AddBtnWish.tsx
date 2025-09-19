"use client";

import { wishContext } from "@/Context/wishlistContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  onToggle?: (isFav: boolean) => void;
};

export default function WishlistBtn({ id, onToggle }: Props) {
  const { products, addProductToWish } = useContext(wishContext);
  const [isFav, setIsFav] = useState(false);

  // تحديث اللون بناءً على وجود المنتج في الـ wishlist
  useEffect(() => {
    setIsFav(products.some(p => p._id === id));
  }, [products, id]);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const data = await addProductToWish(id);
      console.log("Wishlist Response:", data);

      const next = !isFav;
      setIsFav(next);
      if (onToggle) onToggle(next);

      if (data.status === "success") {
        toast.success(data.message, {
          duration: 1000,
          position: "top-center",
        });
      } else {
        toast.error("Failed to update wishlist", {
          duration: 1000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error("Something went wrong!", {
        duration: 1000,
        position: "top-center",
      });
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isFav}
      onClick={handleClick}
      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
      className={
        "p-2 rounded-full transition-all duration-150 focus:outline-none cursor-pointer " +
        (isFav
          ? "bg-red-50 hover:bg-red-100 scale-105"
          : "bg-white hover:bg-gray-100")
      }
    >
      <i
        className={
          `fa-solid fa-heart text-xl transition-colors duration-150 ` +
          (isFav ? "text-red-500" : "text-gray-400")
        }
        aria-hidden="true"
      />
    </button>
  );
}
