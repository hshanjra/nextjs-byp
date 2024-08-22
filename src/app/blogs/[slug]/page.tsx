import { fetchSinglePost } from "@/actions/BlogAction";
import { SITE_METADATA } from "@/constants";
import { formatDate, transformText } from "@/lib/utils";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // fetch blog post
  const { blogPost: post, error } = await fetchSinglePost(params.slug);
  if (!post || error) return;

  return {
    title: `${transformText(post.title, { format: "capitalCase" })} | ${SITE_METADATA.title}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "website",
      siteName: SITE_METADATA.name,
      images: post.image,
    },
  };
}

async function BlogPost({ params }: { params: { slug: string } }) {
  const { blogPost: post, error } = await fetchSinglePost(params.slug);

  if (!post || error) return;

  return (
    <section>
      <h1 className="mt-5 text-4xl font-semibold tracking-wide">
        {post.title}
      </h1>
      {/* Date */}
      <div className="mt-3 flex flex-col">
        <h6 className="text-sm font-light text-gray-500">Date</h6>
        <span className="text-sm">{formatDate(post.publishedAt)}</span>
      </div>

      <Image
        src={post.image}
        alt={post.title}
        height={718}
        width={960}
        className="mt-5 aspect-[960/718] h-auto w-full rounded-xl object-cover transition-all duration-200 hover:brightness-75"
      />

      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </section>
  );
}

export default BlogPost;
