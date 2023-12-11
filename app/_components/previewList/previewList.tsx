"use client";
import { useEffect, useState } from "react";
import PostCard from "./postCard";
import { useUserContext } from "@/app/_context/context";
import buttonCSS from "./button.module.css";

const PreviewList = ({ link }: { link: string }) => {
  const [end, setEnd] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(1);
  const [allPost, setAllPost] = useState([] as any[]);
  const { user } = useUserContext();
  useEffect(() => {
    fetch(`${link}?page=${page}`, {
      credentials: "include",
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.success) {
            setAllPost((prev) =>
              [...allPost, ...data.data.preview].slice(0, page * 5)
            );
            setEnd(data.data.end);
          } else {
            alert(data.message);
          }
        })
      )
      .catch((err) => {
        alert("Cannot connect to the server");
      })
      .finally(() => {
        setDisabled(false);
      });
  }, [page]);
  useEffect(() => {
    setPage(1);
    fetch(`${link}?page=${1}`, {
      credentials: "include",
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.success) {
            setAllPost(data.data.preview);
            setEnd(data.data.end);
          } else {
            alert(data.message);
          }
        })
      )
      .catch((err) => {
        alert("Cannot connect to the server");
      })
      .finally(() => {
        setDisabled(false);
      });
  }, [user]);
  return (
    <div>
      {allPost.length > 0 ? (
        allPost.map((postPreview) => (
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
      {end ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            className={buttonCSS.button}
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              setPage((prev) => prev + 1);
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewList;
