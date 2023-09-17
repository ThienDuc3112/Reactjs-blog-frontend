import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import createPost from "./createPost.module.css"

const CreatePost = () => {
    let [post, setPost] = useState("")
    return (
        <>
            <h1 className={createPost.center}>Create your post</h1>
            <input
                type="text"
                placeholder="Enter your post title"
                className={createPost.center}
                style={{
                    marginBottom: 20,
                    marginTop: 20,
                }}
            />
            <textarea
                placeholder="Type out your thought"
                style={{
                    marginTop: 20
                }}
                value={post}
                onChange={(e) => { setPost(e.target.value) }}
                className={`${createPost.center} ${createPost.prettyTextArea}`}

            />
            <h1
                className={createPost.center}
                style={{
                    marginTop: 50,
                    marginBottom: 20
                }}
            >Preview</h1>
            <Markdown
                options={{ forceBlock: true }}
                style={{ "white-space": "pre-wrap" }}
                className={createPost.center}
            >
                {post}
            </Markdown>


        </>
    )
}

export default CreatePost;
