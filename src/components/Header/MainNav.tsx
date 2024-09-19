"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { cn, formatPrice, trimString } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MaxWidthWrapper from "../MaxWidthWrapper";
import CategoryItems from "./CategoryList";
import { BadgePercent, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/ProductsAction";
import { Product } from "@/types/product";
import Image from "next/image";
import ReviewStar from "../ReviewStar";
import { buttonVariants } from "../ui/button";
import { getAllCategories } from "@/actions/CategoryAction";

const BRANDS = [
  {
    id: 1,
    name: "honda",
    image: "/images/brands/honda.png",
  },
  {
    id: 2,
    name: "toyota",
    image: "/images/brands/toyota.png",
  },
  {
    id: 3,
    name: "nissan",
    image: "/images/brands/nissan.png",
  },
  {
    id: 4,
    name: "ford",
    image: "/images/brands/ford.png",
  },
  {
    id: 5,
    name: "bmw",
    image: "/images/brands/bmw.png",
  },
];

const MainNav = () => {
  const pathname = usePathname();

  const { data: topOffers, isLoading } = useQuery({
    queryKey: ["top-offers"],
    queryFn: () =>
      getAllProducts({
        limit: 5,
        sort: "price-asc",
      }),
  });

  const { data: airBags } = useQuery({
    queryKey: ["air-bags"],
    queryFn: () =>
      getAllProducts({
        limit: 5,
        category: "air-bags",
      }),
  });

  // Fetch all categories
  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return (
    pathname === "/" && (
      <MaxWidthWrapper className="flex items-center justify-between">
        {/* Category List */}

        <div className="relative h-12 w-1/4 rounded-b-none rounded-t-xl bg-primary">
          <h3 className="m-0 h-full w-full p-4 align-middle text-base text-white">
            All Categories
          </h3>

          {/* Category List */}
          <CategoryItems
            direction="down"
            className="absolute z-10 w-full rounded-b-xl bg-white shadow-md"
          />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/products" legacyBehavior passHref>
                  Shop
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="mt-3 grid w-[1200px] grid-cols-3 justify-between gap-5 p-4">
                  <div>
                    <h3 className="p-2 text-sm font-semibold text-gray-300">
                      Categories
                    </h3>
                    <ul className="mt-5">
                      {categories?.categories?.map((category) => (
                        <Link
                          href={`/categories/${category.categorySlug}`}
                          key={category._id}
                        >
                          <li className="rounded-lg p-2 text-[14px] text-gray-900 hover:bg-primary-foreground hover:text-primary">
                            {category.categoryName}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="p-2 text-sm font-semibold text-gray-300">
                      Shop by brands
                    </h3>

                    <ul className="mt-5">
                      {BRANDS.map((brand) => (
                        <Link href={"#"} key={brand.id}>
                          <li className="rounded-lg p-2 text-[14px] capitalize text-gray-900 hover:bg-primary-foreground hover:text-primary">
                            {brand.name} parts
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="p-2 text-sm font-semibold text-gray-300">
                      Shop by Price
                    </h3>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/categories/air-bags" legacyBehavior passHref>
                  Air Bags
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <React.Suspense>
                  {airBags?.products ? (
                    <div className="p-4">
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-base font-bold capitalize">
                          Shop top quality air bags.
                        </h3>
                        <Link
                          href={"/categories/air-bags"}
                          className={cn(buttonVariants({ variant: "dark" }))}
                        >
                          Explore more &rarr;
                        </Link>
                      </div>
                      <p className="mb-5 text-sm text-gray-500">
                        Buy top quality air bags in new & used condition.
                      </p>
                      <ProductCard products={airBags.products} />
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </React.Suspense>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/categories/tires-and-wheels" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tires & Wheels
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blogs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BadgePercent className="mr-2 h-5 w-5" />
                Top Offers
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Render Products */}
                <React.Suspense>
                  {topOffers?.products ? (
                    <div className="p-4">
                      <div className="mb-5">
                        <h3 className="text-base font-bold">
                          Items on sale this week
                        </h3>
                        <p className="text-sm text-gray-400">
                          Top picks this week. Up to 50% off the best selling
                          products.
                        </p>
                      </div>
                      <ProductCard products={topOffers.products} />
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </React.Suspense>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="ml-auto">
          <Link
            href="/help-center"
            className="flex items-center gap-1 text-primary"
          >
            <Info className="h-4 w-4" />
            Help Center
          </Link>
        </NavigationMenu>
      </MaxWidthWrapper>
    )
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-foreground hover:text-destructive focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug group-hover:text-primary/70">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ProductCard = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex w-[400px] gap-3 md:w-[500px] lg:w-[1200px]">
      {products.map((product) => (
        <Link href={`/product/${product.productSlug}`} key={product.productId}>
          <div className="flex flex-col space-y-5">
            <Image
              alt={product.productTitle}
              src={product.productImages[0].url}
              width={500}
              height={500}
              className="h-auto w-[500px] overflow-hidden rounded-xl border object-contain"
            />

            <h2 className="text-sm font-semibold hover:text-primary">
              {trimString(product.productTitle, 50)}
            </h2>

            {/* Review */}
            <div className="flex gap-1">
              <ReviewStar rating={5} />
              <span className="mt-1 text-sm font-semibold">1 review</span>
            </div>
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 line-through">
                {formatPrice(product.regularPrice)}
              </span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.salePrice)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
