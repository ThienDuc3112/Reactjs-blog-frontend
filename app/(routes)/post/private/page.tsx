"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import post from "../public/page.module.css";
import Comments from "@/app/_components/comments/comments";
import EditAndDelete from "./editAndDelete";

const PrivatePost = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const router = useRouter();
  const [data, setData] = useState(undefined as any);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${searchParams.id}`, {
      cache: "no-cache",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok)
          res.json().then((data) => {
            if (!data.success) {
              router.push("/notfound");
              return;
            }
            setData(data.data);
          });
        else router.push("/");
        return;
      })
      .catch((err) => {
        router.push("/");
        return;
      });
  }, []);
  if (!data) {
    return <></>;
  }
  let date = new Date(data.time);
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
      <EditAndDelete author={data.author} id={searchParams.id} />
      <Comments id={searchParams.id} />
    </>
  );
};

export default PrivatePost;
