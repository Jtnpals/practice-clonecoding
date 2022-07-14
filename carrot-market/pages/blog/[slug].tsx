import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import { getServerSideProps } from "pages";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

interface Data {
  title: string;
  date: string;
  category: string;
}

const Post: NextPage<{ data: Data; post: string }> = ({
  data: { title, date, category },
  post,
}) => {
  return (
    <>
      <h1>{title}</h1>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </>
  );
};

export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
