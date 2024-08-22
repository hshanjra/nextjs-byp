"use server";

import axios from "axios";

const blogApi = axios.create({
  baseURL: process.env.BLOGGER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type BlogPost = {
  id: string;
  blogId: string;
  publishedAt: Date;
  updatedAt: Date;
  title: string;
  url: string;
  slug?: string;
  content: string;
  image: string;
  excerpt: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    imageUrl: string;
  };
};

interface IBlogPosts {
  blogs: BlogPost[] | null;
  error: string;
}

interface ISingleBlogPost {
  blogPost: BlogPost | null;
  error: string;
}

export const fetchBlogPosts = async (): Promise<IBlogPosts> => {
  try {
    const { data } = await blogApi.get(
      `/blogs/${process.env.BLOGGER_BLOG_ID}/posts?key=${process.env.BLOGGER_API_KEY}`,
    );

    const posts = data.items.map((post: any) => {
      // Extract the image URL from the content
      const imgRegex = /<img.*?src="(.*?)"/;
      const imageMatch = post.content.match(imgRegex);
      const imageUrl = imageMatch ? imageMatch[1] : null;

      // Extract an excerpt (first 100 characters from the content text)
      const textContent = post.content.replace(/<[^>]+>/g, ""); // Remove HTML tags
      const excerpt =
        textContent.slice(0, 300) + (textContent.length > 300 ? "..." : "");

      // Create the slug by removing the domain and .html, and adding the post ID
      const urlPath = post.url.replace(/https?:\/\/[^\/]+\/2024\/08\//, ""); // Remove domain
      const slugWithoutHtml = urlPath.replace(".html", ""); // Remove .html
      const slug = `${slugWithoutHtml}-${post.id}`; // Add post ID

      return {
        id: post.id,
        blogId: post.blog.id,
        publishedAt: post.published,
        updatedAt: post.updated,
        title: post.title,
        url: post.url,
        slug: slug,
        content: post.content,
        image: imageUrl,
        excerpt: excerpt,
        author: {
          id: post.author.id,
          displayName: post.author.displayName,
          url: post.author.url,
          imageUrl: post.author.image.url,
        },
      };
    });

    return { blogs: posts, error: "" };
  } catch (error: any) {
    console.error(error);
    return { blogs: null, error: error.message };
  }
};

export const fetchSinglePost = async (
  slug: string,
): Promise<ISingleBlogPost> => {
  try {
    // Extract post id from slug
    const postId = await getIdFromSlug(slug);

    const { data } = await blogApi.get(
      `/blogs/${process.env.BLOGGER_BLOG_ID}/posts/${postId}?key=${process.env.BLOGGER_API_KEY}`,
    );

    // Extract the image URL from the content
    const imgRegex = /<img.*?src="(.*?)"/;
    const imageMatch = data.content.match(imgRegex);
    const imageUrl = imageMatch ? imageMatch[1] : null;

    // Remove <img> tags from the content
    const contentWithoutImg = data.content.replace(/<img[^>]*>/g, "");

    // Extract an excerpt (first 100 characters from the content text)
    const textContent = data.content.replace(/<[^>]+>/g, ""); // Remove HTML tags
    const excerpt =
      textContent.slice(0, 300) + (textContent.length > 300 ? "..." : "");

    const blogPost = {
      id: data.id,
      blogId: data.blog.id,
      publishedAt: data.published,
      updatedAt: data.updated,
      title: data.title,
      url: data.url,
      image: imageUrl,
      excerpt,
      content: contentWithoutImg,
      author: {
        id: data.author.id,
        displayName: data.author.displayName,
        url: data.author.url,
        imageUrl: data.author.image.url,
      },
    };

    return { blogPost: blogPost, error: "" };
  } catch (error: any) {
    // console.error(error);
    return { blogPost: null, error: error.message };
  }
};

export async function getIdFromSlug(slug: string) {
  const slugParts = slug.split("-");
  return slugParts[slugParts.length - 1]; // The ID is the last part after splitting by '-'
}
