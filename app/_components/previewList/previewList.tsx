"use client";
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard";

const PreviewList = () => {
  const [allPost, setAllPost] = useState([] as any[]);

  useEffect(() => {
    fetch(`http://localhost:6969/post/previewall`)
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
  }, []);
  return (
    <div>
      {allPost
        //   .filter(
        //     (post) =>
        //       post.isPublic ||
        //       post?.author === user?.username ||
        //       user?.username == "huyen"
        //   )
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
        ))}
    </div>
  );
};

export default PreviewList;
