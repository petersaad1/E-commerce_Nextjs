// app/brands/page.tsx
import Image from "next/image";
import AllBrands from "@/apis/AllBrands";
import { Brand } from "@/types/products.type";

export default async function BrandsPage() {
  const brands = await AllBrands();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Brands
      </h1>

      {brands.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
          No brands found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand: Brand) => (
            <div
              key={brand._id}
              className="rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
