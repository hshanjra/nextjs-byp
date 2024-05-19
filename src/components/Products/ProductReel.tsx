"use client";
import { getProducts } from "@/actions/products-action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function ProductReel() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (error) {
    return <div>{error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = JSON.parse(data as string);

  return (
    <div>
      {products.map((p: any) => (
        <ul key={p._id}>
          <li className="text-3xl text-red-600">{p.productTitle}</li>
          <Image
            src={p.productImages[0].url}
            alt={p.productTitle}
            width={200}
            height={200}
          />
        </ul>
      ))}
    </div>
  );
}
