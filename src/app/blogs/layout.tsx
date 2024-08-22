import Banner from "@/components/Banner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RecentBlogPosts from "./recentBlogPosts";
import { fetchSinglePost } from "@/actions/BlogAction";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | " + SITE_METADATA.title,
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper className="my-10">
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {/* Left */}
        <div className="col-span-3 space-y-10">{children}</div>

        {/* Right */}
        <div className="flex flex-col gap-5">
          {/* Recent Posts */}
          <h3 className="font-semibold">Recent Blogs</h3>

          <RecentBlogPosts />

          {/* Banner */}
          <div>
            <Banner
              imgUrl="/images/banner-26.jpg"
              className="mx-auto h-[500px] w-auto cursor-pointer rounded-xl bg-none p-7"
            >
              <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold text-white">
                On Sale This Week
              </span>
              <h3 className="my-3 max-w-96 text-xl font-bold capitalize leading-snug">
                Wide range of genuine auto parts at premium pricing
              </h3>

              <span className="text-sm">Shop Now &rarr;</span>
            </Banner>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
