"use client";
import { useState } from "react";
import commentCSS from "./comments.module.css";
import CommentField from "./commentField";
import CommentCard from "./commentCard";

const Comments = ({ id }: { id: string }) => {
  const [disabled, setDisabled] = useState(false);
  const [comments, setComment] = useState([] as any[]);
  const toggleDisabled = () => setDisabled((prev) => !prev);
  const requestComments = () => {
    toggleDisabled();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              setComment((prev) => [...prev, ...data.data]);
              return;
            }
            alert("I haven't handle this case");
          });
        } else {
          alert("Handle res not ok");
        }
      })
      .catch((err) => {
        alert("An error happened");
      })
      .finally(toggleDisabled);
  };
  return (
    <div className={commentCSS.commentSection}>
      <CommentField />
      {comments.map((comment) => (
        <CommentCard key={`${Math.random()}`} />
      ))}
      <button
        className={`${commentCSS.button} ${disabled ?? commentCSS.disabled}`}
        disabled={disabled}
        onClick={requestComments}
      >
        <p>Load comments</p>
      </button>
    </div>
  );
};

export default Comments;
