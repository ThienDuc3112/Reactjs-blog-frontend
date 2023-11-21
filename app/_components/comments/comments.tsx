"use client";
import { useState } from "react";

const Comments = () => {
  const [test, setTest] = useState(0);
  return (
    <div>
      <button onClick={() => setTest((prev) => prev + 1)}>
        Load comments {test}
      </button>
    </div>
  );
};

export default Comments;
