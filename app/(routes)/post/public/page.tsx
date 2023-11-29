import { redirect } from "next/navigation";
import React from "react";
import post from "./page.module.css";
import Comments from "@/app/_components/comments/comments";
import EditAndDelete from "./editAndDelete";

const Post = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${searchParams["id"]}`,
    {
      cache: "no-cache",
    }
  );
  const dataJson = await res.json();
  if (!dataJson.success) {
    redirect("/notfound");
  }
  const data = dataJson.data;
  const date = new Date(data.time);
  return (
    <>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.tags.join(", ")} />
      <meta name="author" content={data.author} />
      <div className={post.page}>
        <div className={post.frontMatter}>
          <h1>{data.title}</h1>
          <p>
            📆 Written on {`${date.toLocaleDateString("en-GB")}`} | ⌛{" "}
            {data.readTime} minute to read
          </p>
          <p>
            ✍️ Author:{" "}
            {data.author.length > 0
              ? data.author[0].toUpperCase() + data.author.slice(1)
              : "Anonymous"}{" "}
            | 🩹 Last edited: {new Date().toLocaleDateString("en-GB")}
          </p>
          <p>🔎 Visiblity: {data.isPublic ? "Public" : "Private"}</p>
          <p>📋 Tags: {data.tags.join(", ")}</p>
        </div>
        <hr />
        <div>
          <h3>Description</h3>
          <p>{data.description}</p>
        </div>
        <hr />
        <h3>Content</h3>
        <div
          className={post.post}
          dangerouslySetInnerHTML={{ __html: data.post }}
        />
      </div>
      <EditAndDelete author={data.author} id={searchParams["id"]} />
      <Comments id={searchParams["id"]} />
    </>
  );
};

export default Post;
