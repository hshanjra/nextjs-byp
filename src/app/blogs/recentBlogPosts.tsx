"use client";

import { fetchBlogPosts } from "@/actions/BlogAction";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function RecentBlogPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentBlogPosts"],
    queryFn: async () => await fetchBlogPosts(),
  });

  if (isLoading || data?.error || !data) {
    return Array.from({ length: 4 }).map((_, index) => (
      <div className="flex flex-col gap-5" key={index}>
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-full">
            <Skeleton className="h-[70px] w-[70px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="mb-2 h-2 w-20" />

            <Skeleton className="h-2 w-52" />
            <Skeleton className="h-2 w-32" />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="flex flex-col gap-5">
      {data?.blogs?.map((blog) => (
        <div className="flex items-center gap-3" key={blog.id}>
          <div className="max-w-[4.12rem] overflow-hidden rounded-full">
            <Image
              src={blog.image}
              alt={blog.title}
              height={135}
              width={135}
              className="aspect-square h-auto w-auto object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs">{formatDate(blog.publishedAt)}</span>
            <Link
              href={`/blogs/${blog.slug}`}
              className="transition-all duration-300 hover:text-red-500"
            >
              <h4 className="text-sm font-semibold uppercase">{blog.title}</h4>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
