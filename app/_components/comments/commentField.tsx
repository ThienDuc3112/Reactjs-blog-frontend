"use client";
import { FormEvent, useState } from "react";
import CSS from "./commentField.module.css";
import { setState } from "@/app/_interfaces/setState";
import { IComment } from "@/app/_interfaces/comment";

const CommentField = ({
  id,
  setComments,
}: {
  id: string;
  setComments: setState<IComment[]>;
}) => {
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ message: comment }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            if (data.success) {
              setComments((prev) => [data.data, ...prev]);
              setComment("");
              alert("Comment posted");
            }
          });
        } else {
          alert(`Cannot post your comment, status code ${res.status}`);
        }
      })
      .catch((err) => {
        alert("Internal error with fetch");
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <div className={CSS.commentField}>
      <h3 className={CSS.header}>Comments</h3>
      <form onSubmit={submit} className={CSS.commentForm}>
        <textarea
          placeholder="Comment haven't been implement yet"
          className={CSS.commentArea}
          onChange={(e) => {
            console.log(comment);
            setComment(e.target.value.slice(0, 1000));
          }}
        />
        <div className={CSS.info}>
          <p
            style={{ margin: "20px" }}
          >{`Character count: ${comment.length}/1000`}</p>
          <button type="submit" className={CSS.button} disabled={disabled}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentField;
