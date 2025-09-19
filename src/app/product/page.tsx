import React from "react";
import AllProducts from "@/apis/AllProducts";
import { product } from "@/types/products.type";
import HomeCard from './../_component/HomeCard/HomeCard';



export default async function Product() {
   const data:product[] = await AllProducts();

  return (
    <section className="px-4 md:px-0 w-full md:w-[80%] mx-auto my-10">
        <div className="flex flex-wrap ">
          {data.map((product:product , idx:number) => (
           <HomeCard key={idx} product={product} />
          ))}
        </div>
    </section>
  );
}
