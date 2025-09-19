// app/categories/page.tsx
import Image from "next/image";
import getAllCategories from "@/apis/AllCategories";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat: any) => (
          <div
            key={cat._id}
            className="rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden bg-card border border-border"
          >
            <div className="h-36 sm:h-44 md:h-48 w-full overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="font-semibold text-lg text-card-foreground">
                {cat.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
