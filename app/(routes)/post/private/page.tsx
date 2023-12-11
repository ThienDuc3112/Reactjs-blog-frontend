"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import post from "../public/page.module.css";
import Comments from "@/app/_components/comments/comments";
import EditAndDelete from "./editAndDelete";
import { useFetch } from "@/app/_hooks/useFetch";

const PrivatePost = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const router = useRouter();
  const { data, loading, err } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${searchParams.id}`,
    true
  );
  if (!loading && (!data?.success || err)) {
    router.push("/notfound");
    return;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <></>;
  }
  let date = new Date(data.data.time);
  return (
    <>
      <title>{data.data.title}</title>
      <meta name="description" content={data.data.description} />
      <meta name="keywords" content={data.data.tags.join(", ")} />
      <meta name="author" content={data.data.author} />
      <div className={post.page}>
        <div className={post.frontMatter}>
          <h1>{data.data.title}</h1>
          <p>
            📆 Written on {`${date.toLocaleDateString("en-GB")}`} | ⌛{" "}
            {data.data.readTime} minute to read
          </p>
          <p>
            ✍️ Author:{" "}
            {data.data.author.length > 0
              ? data.data.author[0].toUpperCase() + data.data.author.slice(1)
              : "Anonymous"}{" "}
            | 🩹 Last edited: {new Date().toLocaleDateString("en-GB")}
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
      <EditAndDelete author={data.data.author} id={searchParams.id} />
      <Comments id={searchParams.id} />
    </>
  );
};

export default PrivatePost;
