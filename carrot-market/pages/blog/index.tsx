import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  console.log(posts);
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1>latest Post</h1>
      {posts?.map((post, index) => (
        <div key={index}>
          <Link href={`/blog/${post.slug}`}>
            <a>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <p>{post.category}</p>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf8");
    return { ...matter(content).data, slug: file.split(".")[0] };
  });
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default Blog;
