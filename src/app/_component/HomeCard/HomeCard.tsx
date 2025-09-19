import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { product } from "@/types/products.type";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import WishlistBtn from "../AddBtnWish/AddBtnWish";

function HomeCard({ product }: { product: product }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
      <Card className="group relative px-3 border border-transparent dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow hover:shadow-green-400 dark:hover:shadow-green-600 transition-all duration-300 cursor-pointer overflow-hidden">
        <Link href={`/productdetails/${product._id}`}>
          <CardHeader className="p-0 overflow-hidden">
            <Image
              width={500}
              height={500}
              src={product.imageCover}
              alt={product.title}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </CardHeader>

          <CardContent className="p-0 mt-2">
            <p className="font-bold text-xl text-green-500 mb-1">
              {product.category.name}
            </p>
            <div className="flex items-center justify-between">
              <p className="line-clamp-1 text-gray-900 dark:text-gray-100">{product.title}</p>
              <WishlistBtn id={product._id}></WishlistBtn>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-2">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-md text-green-500">
                {product.price} EGP
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {product.ratingsAverage}{" "}
                <i className="fa-solid fa-star font-bold text-md text-yellow-400"></i>
              </p>
            </div>
          </CardFooter>
        </Link>

        <div
          className="absolute bottom-4 left-0 w-full px-3 z-50 
  opacity-100 md:opacity-0 
  md:translate-y-6 md:group-hover:translate-y-0 md:group-hover:opacity-100
  transition-all duration-500 ease-in-out"
        >
          <AddBtnCart id={product._id} />
        </div>
      </Card>
    </div>
  );
}

export default HomeCard;
