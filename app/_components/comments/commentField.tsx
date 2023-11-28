"use client";

import { FormEvent, useState } from "react";

const CommentField = () => {
  const [comment, setComment] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Comment have not been implemented yet");
  };
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Comment haven't been implement yet"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CommentField;
