import { IProduct } from "@/types/Product";
import ProductCard from "./ProductCard";
import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function ProductReel({ products }: { products: IProduct[] }) {
  return (
    <section className="py-2">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {products?.map((p) => (
            <CarouselItem
              key={p.productId}
              className="lg:space-x-5 basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="flex ">
                <ProductCard product={p} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Separator className="my-5" />
      {/* slider indicators */}
    </section>
  );
}
