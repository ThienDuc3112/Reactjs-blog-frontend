"use client";
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard";
import { useUserContext } from "@/app/_context/context";

const PreviewList = ({ link }: { link: string }) => {
  const [allPost, setAllPost] = useState([] as any[]);
  const { user } = useUserContext();
  useEffect(() => {
    fetch(link, {
      credentials: "include",
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.success) {
            setAllPost(data.data);
          }
        })
      )
      .catch((err) => {
        alert("Cannot connect to the server");
      });
  }, [user]);
  return (
    <div>
      {allPost.length > 0 ? (
        allPost
          .reverse()
          .map((postPreview) => (
            <PostCard
              key={postPreview.id}
              tags={postPreview.tags}
              id={postPreview.id}
              title={postPreview.title}
              readTime={postPreview.readTime}
              description={postPreview.description}
              time={postPreview.time}
              author={postPreview.author ?? "Anonymous"}
            />
          ))
      ) : (
        <p
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Empty, just like me insdie
        </p>
      )}
    </div>
  );
};

export default PreviewList;
