"use client";
import { cartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { cartProduct } from "@/types/cart.type";
import Image from "next/image";
import { toast } from "sonner";

const Cart = () => {
  const {
    totalCartPrice,
    products,
    removeCartItem,
    updateCartItem,
    clearCart,
  } = useContext(cartContext);

  async function removeItem(id: string) {
    const data = await removeCartItem(id);

    if (!data) {
      toast.error("Failed to remove this product", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (data.status === "success") {
      toast.success("Product deleted", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Failed to remove this product", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  async function updateItem(id: string, count: number) {
    const data = await updateCartItem(id, count);

    if (!data) {
      toast.error("Failed to update this product", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (data.status === "success") {
      toast.success("Product updated", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Failed to update this product", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  return (
    <div className="w-full md:w-[80%] px-5 md:px-10 mx-auto my-10 flex flex-col items-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-transparent rounded-2xl text-center transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mt-5">
            Your Cart is Empty 🛒
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
            Looks like you haven’t added anything yet. Start shopping now and
            fill your cart with amazing products!
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="p-5 w-full flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Shop Cart:</h1>
              <p className="my-3 text-green-600 font-mono">
                Total cart Price: {totalCartPrice} EGP
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 w-full md:w-auto">
              <Button
                onClick={() => clearCart()}
                className="bg-transparent border border-red-600 text-red-600 hover:bg-red-700 hover:text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Clear Cart
              </Button>
              <Button
                onClick={() => (window.location.href = "/payment")}
                className="bg-transparent border border-green-600 text-green-600 hover:bg-green-700 hover:text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Check Out
              </Button>
            </div>
          </div>

          <div className="allProducts w-full">
            {products.map((product: cartProduct, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center md:flex-row md:items-center justify-between my-5 pb-5 border-b-[1px] border-gray-300 dark:border-gray-700 w-full transition-colors duration-300"
              >
                <div className="flex flex-col items-center md:flex-row md:items-center gap-5 w-full">
                  <div>
                    <Image
                      alt={product.product.title}
                      src={product.product.imageCover}
                      width={100}
                      height={100}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded transition-colors duration-300"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="font-bold text-slate-700 dark:text-gray-100 my-3">
                      {product.product.title}
                    </h1>
                    <p className="text-green-600 font-mono my-3">
                      Price: {product.price} EGP
                    </p>
                    <Button
                      onClick={() => removeItem(product.product._id)}
                      className="bg-transparent border border-red-600 text-red-600 hover:bg-red-700 hover:text-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </Button>
                  </div>
                </div>
                <div className="flex gap-3 p-5 mt-3 md:mt-0 justify-center md:justify-start w-full md:w-auto">
                  <Button
                    onClick={() =>
                      updateItem(product.product._id, product.count + 1)
                    }
                    className="bg-transparent border border-green-600 text-green-600 hover:bg-green-700 hover:text-white transform hover:scale-105 transition-all duration-300 cursor-pointer px-2 py-2 text-sm"
                  >
                    +
                  </Button>
                  <p className="text-base">{product.count}</p>
                  <Button
                    onClick={() =>
                      updateItem(product.product._id, product.count - 1)
                    }
                    className="bg-transparent border border-green-600 text-green-600 hover:bg-green-700 hover:text-white transform hover:scale-105 transition-all duration-300 cursor-pointer px-2 py-2 text-sm"
                  >
                    -
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
