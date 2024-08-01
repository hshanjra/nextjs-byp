import { getAllCategories } from "@/actions/CategoryAction";
import EmptyState from "@/components/Products/EmptyState";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const { categories, error } = await getAllCategories();

  if (!categories || error) return <EmptyState />;

  return (
    <section>
      <h1 className="text-3xl uppercase font-bold mb-5">Explore Categories</h1>
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="overflow-hidden w-full border p-5 hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer bg-white"
            >
              <Link href={`/categories/${cat.categorySlug}`}>
                <Image
                  src={cat.categoryThumbnail}
                  width={100}
                  height={100}
                  alt={cat.categoryName}
                  className="w-auto h-auto m-auto"
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
  );
}
