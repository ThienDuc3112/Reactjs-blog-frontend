import { redirect } from "next/navigation";
import React from "react";
import post from "./page.module.css";
import Comments from "@/app/_components/comments/comments";

const Post = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.API_URL}/post/${params.id}`);
  const data = await res.json();
  if (!data.success) {
    redirect("/notfound");
  }
  const date = new Date(data.data.time);
  return (
    <>
      <div className={post.page}>
        <div className={post.frontMatter}>
          <h1>{data.data.title}</h1>
          <p>
            📆 Written on {`${date.toLocaleDateString("en-GB")}`} | ⌛{" "}
            {data.data.readTime} minute to read
          </p>
          <p>
            ✍️ Author:{" "}
            {data.data.author[0].toUpperCase() + data.data.author.slice(1)} | 🩹
            Last edited: {new Date().toLocaleDateString("en-GB")}
          </p>
          <p>🔎 Visiblity: {data.data.isPublic ? "Public" : "Private"}</p>
          <p>📋 Tags: {data.data.tags.join(", ")}</p>
        </div>
        <hr />
        <div>
          <h3>Description</h3>
          <p>{data.data.description}</p>
        </div>
        <hr />
        <h3>Content</h3>
        <div
          className={post.post}
          dangerouslySetInnerHTML={{ __html: data.data.post }}
        />
      </div>
      <Comments />
    </>
  );
};

export default Post;
