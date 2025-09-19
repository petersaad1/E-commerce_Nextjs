"use client";

import { wishContext } from "@/Context/wishlistContext";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddBtnCart from "../_component/AddBtnCart/AddBtnCart";
import { product } from "@/types/products.type";

const Wishlist = () => {
  const { products, removeWishItem } = useContext(wishContext);

  return (
    <div className="w-full md:w-[80%] px-5 md:px-10 mx-auto my-10 flex flex-col items-center">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-transparent rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground mt-5">
            Your Wish List is Empty ❤️
          </h2>
          <p className="text-muted-foreground mt-2 text-center max-w-md">
            Your wishlist is empty! Start exploring and add your favorite items
            today!
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="p-5 w-full flex items-center justify-center md:justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              My Wish List:
            </h1>
          </div>

          <div className="allProducts w-full">
            {products.map((product: product, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center md:flex-row md:items-center justify-between my-5 pb-5 border-b border-border w-full"
              >
                <div className="flex flex-col items-center md:flex-row md:items-center gap-5 w-full">
                  <Image
                    alt={product.title}
                    src={product.imageCover}
                    width={100}
                    height={100}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md"
                  />
                  <div className="text-center md:text-left">
                    <h1 className="font-bold text-foreground my-3">
                      {product.title}
                    </h1>
                    <p className="text-primary font-mono my-3">
                      Price: {product.price} EGP
                    </p>
                    <Button
                      onClick={() => removeWishItem(product._id)}
                      className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-black transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </Button>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2 justify-center md:justify-start w-full md:w-auto">
                  <AddBtnCart
                    id={product._id}
                    onAdded={() => removeWishItem(product._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
