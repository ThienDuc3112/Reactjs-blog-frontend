"use client";
import { useState } from "react";
import commentCSS from "./comments.module.css";
import CommentField from "./commentField";
import CommentCard from "./commentCard";
import { IComment } from "@/app/_interfaces/comment";

const Comments = ({ id }: { id: string }) => {
  const [disabled, setDisabled] = useState(false);
  const [comments, setComments] = useState([] as IComment[]);
  const toggleDisabled = () => setDisabled((prev) => !prev);
  const requestComments = () => {
    toggleDisabled();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              setComments((prev) => [...prev, ...data.data]);
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
      });
    // .finally(toggleDisabled);
  };
  return (
    <div className={commentCSS.commentSection}>
      <CommentField id={id} setComments={setComments} />
      {comments.map((comment: IComment) => (
        <CommentCard
          setComments={setComments}
          message={comment.message}
          username={comment.username}
          date={new Date(comment.date)}
          _id={comment._id}
          key={`${Math.random()}`}
        />
      ))}
      <div>
        <button
          className={`${commentCSS.button}`}
          disabled={disabled}
          onClick={requestComments}
        >
          {disabled ? "Disabled" : "Load comments"}
        </button>
      </div>
    </div>
  );
};

export default Comments;
