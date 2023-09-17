import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import createPost from "./createPost.module.css"

const CreatePost = () => {
    let [post, setPost] = useState("")
    let [description, setDescription] = useState("")
    return (
        <>
            <h1
                className={createPost.center}
                style={{
                    marginTop: "5vh"
                }}
            >Create your post</h1>

            <input
                type="text"
                id="title"
                placeholder="Enter your post title"
                className={`${createPost.center} ${createPost.prettyTitle} ${createPost.inputfocus}`}
                style={{
                    marginBottom: 30,
                    marginTop: 30,
                }}
            />

            <textarea
                id="description"
                placeholder="Description of the post"
                style={{
                    margin: "30px auto 30px auto"
                }}
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                className={`${createPost.center} ${createPost.prettyDescription} ${createPost.inputfocus}`}
            />

            <textarea
                id="post"
                placeholder="Type out your thought"
                style={{
                    marginTop: 30
                }}
                value={post}
                onChange={(e) => { setPost(e.target.value) }}
                className={`${createPost.center} ${createPost.prettyPost} ${createPost.inputfocus}`}
            />



            <div className={createPost.center} style={{ margin: "30px auto 30px auto" }}>
                <input
                    type="text"
                    id="tags"
                    placeholder="tags"
                    className={`${createPost.prettyTags}`}
                />
            </div>


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
