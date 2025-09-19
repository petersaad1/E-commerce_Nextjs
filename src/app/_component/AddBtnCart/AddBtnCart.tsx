"use client";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

function AddBtnCart({ id, onAdded }: { id: string, onAdded?: () => void }) {
  const {addProductToCart} = useContext(cartContext)
  async function handleAddToCart() {
    const data = await addProductToCart(id);

    if (data.status === "success") {
      toast.success(data.message, {
        duration: 1000,
        position: "top-center",
      });
      if (onAdded) onAdded();
    } else {
      toast.error("fail to add this product in cart", {
        duration: 1000,
        position: "top-center",
      });
    }
  }
  return (
    <div>
      <Button
        onClick={handleAddToCart}
        className="bg-green-500 hover:bg-green-600 border-0 cursor-pointer w-full text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default AddBtnCart;
