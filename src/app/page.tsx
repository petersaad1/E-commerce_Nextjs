import React from "react";
import HomeCard from "./_component/HomeCard/HomeCard";
import AllProducts from "@/apis/AllProducts";
import MainSlider from "./_component/MainSlider/MainSlider";
import CategorySlider from "./_component/CategorySlider/CategorySlider";
import { product } from "@/types/Products.type";



export default async function Home() {
   const data:product[] = await AllProducts();

  return (
    <section className="px-4 md:px-0 w-full md:w-[80%] mx-auto my-10">
      <MainSlider />
      <CategorySlider />
        <div className="flex flex-wrap ">
          {data.map((product:product , idx:number) => (
           <HomeCard key={idx} product={product} />
          ))}
        </div>
    </section>
  );
}
