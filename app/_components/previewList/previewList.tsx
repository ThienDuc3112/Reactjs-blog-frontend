"use client";
import { useEffect, useState } from "react";
import PostCard from "./postCard";
import { useUserContext } from "@/app/_context/context";

const PreviewList = ({ link }: { link: string }) => {
  // const [page, setPage] = useState(1)
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
          } else {
            alert(data.message);
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
              isPublic={postPreview.isPublic}
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
