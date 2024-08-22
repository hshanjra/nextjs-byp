"use client";
import { fetchBlogPosts } from "@/actions/BlogAction";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage() {
  // Fetch blogs
  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => await fetchBlogPosts(),
  });

  if (isLoading || data?.error || !data)
    return (
      <div className="mx-auto mt-10">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3 className="text-xl font-semibold">Loading...</h3>
        </div>
      </div>
    );

  return data?.blogs?.map((blog) => (
    <div key={blog.id} className="lg:px-5">
      <Link href={`/blogs/${blog.slug}`}>
        <Image
          src={blog.image}
          alt={blog.title}
          height={718}
          width={960}
          className="aspect-[960/718] h-auto w-full rounded-xl object-cover transition-all duration-200 hover:brightness-75"
        />
      </Link>

      <Link href={`/blogs/${blog.slug}`} className="hover:text-red-500">
        <h1 className="mt-5 text-4xl font-semibold tracking-normal">
          {blog.title}
        </h1>
      </Link>

      {/* Date */}
      <div className="mt-3 flex flex-col">
        <h6 className="text-sm font-light text-gray-500">Date</h6>
        <span className="text-sm">{formatDate(blog.publishedAt)}</span>
      </div>

      {/* Excerpt */}
      <div>
        <p
          className="mt-2 text-base font-light text-gray-500"
          dangerouslySetInnerHTML={{ __html: blog.excerpt! }}
        ></p>

        <Link
          href={`/blogs/${blog.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-5 bg-gray-200",
          )}
        >
          Read More
        </Link>
      </div>
    </div>
  ));
}
