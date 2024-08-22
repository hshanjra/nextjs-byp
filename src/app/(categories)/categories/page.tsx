import { getAllCategories } from "@/actions/CategoryAction";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EmptyState from "@/components/Products/EmptyState";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Explore Categories | ${SITE_METADATA.name}`,
  description: "Explore wide range of auto parts that fits with your vehicle.",
  openGraph: {
    images: [`${SITE_METADATA.url}/images/category-brakes.png`],
  },
};

export default async function CategoriesPage() {
  const { categories, error } = await getAllCategories();

  if (!categories || error) return <EmptyState />;

  return (
    <MaxWidthWrapper>
      <section className="my-5">
        <h1 className="my-5 text-3xl font-bold uppercase">
          Explore Categories
        </h1>
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="w-full cursor-pointer overflow-hidden border bg-white p-5 transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <Link href={`/categories/${cat.categorySlug}`}>
                  <Image
                    src={cat.categoryThumbnail}
                    width={100}
                    height={100}
                    alt={cat.categoryName}
                    className="m-auto h-auto w-auto"
                  />
                  <p className="text-center text-sm text-zinc-500">
                    {cat.categoryName}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </MaxWidthWrapper>
  );
}
