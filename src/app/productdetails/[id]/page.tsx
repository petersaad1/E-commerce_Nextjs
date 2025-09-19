import getSingleProduct from "@/apis/SingleProduct";
import Image from "next/image";
import AddBtnCart from "@/app/_component/AddBtnCart/AddBtnCart";
import { product } from "@/types/products.type";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product: product = await getSingleProduct(params.id);

  if (!product) {
    return <p className="text-destructive">Product not found</p>;
  }

  return (
    <div className="w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/3">
        <Image
          width={500}
          height={500}
          src={product.imageCover}
          className="w-full"
          alt="product image"
        />
      </div>
      <div className="w-full md:w-2/3 m-10 md:m-0 px-10 flex flex-col">
        <h2 className="text-2xl font-bold text-primary">{product.title}</h2>
        <p className="my-5 text-foreground">{product.description}</p>
        <p className="my-5 text-muted-foreground">{product.category.name}</p>
        <div className="w-full my-5 flex justify-between items-center">
          <p className="font-bold text-lg text-primary">{product.price} EGP</p>
          <p className="font-bold text-yellow-400">
            {product.ratingsAverage}{" "}
            <i className="fa-solid fa-star"></i>
          </p>
        </div>
        <AddBtnCart id={product._id} />
      </div>
    </div>
  );
}
