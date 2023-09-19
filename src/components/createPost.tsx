import { useState } from "react";
import createPost from "./createPost.module.css"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Post from "./post";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    let navigate = useNavigate()
    let [post, setPost] = useState("")
    let [isPublic, setIsPublic] = useState(true)
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [tags, setTags] = useState([] as string[])

    const tagChange = (value: string) => {
        let tagsCopy = [...tags]
        if (tagsCopy.includes(value)) {
            tagsCopy.splice(tagsCopy.indexOf(value), 1)
            setTags(tagsCopy)
        } else {
            setTags([...tags, value])
        }
    }

    const submit = () => {
        if (title.length == 0 || description.length == 0 || tags.length == 0 || post.length == 0) {
            alert("Please fill in all the field")
            return
        }
        const body = {
            title, description, tags, post, isPublic
        }
        axios.post("http://localhost:6969/post/newpost", body).then((res) => {
            if (res.data.success) {
                console.log(res.data.data)
                alert(`Post has been posted, your post's id is ${res.data.id}`)
                navigate("/")
            }
        })
    }

    return (
        <div className={createPost.page}>
            <h1 style={{ textAlign: "center", color: `var(--light-cyan)` }}>Write your post</h1>

            <div className={createPost.siteEditor}>
                <div id="mainContent" className={createPost.mainContent} >
                    <input type="text" placeholder="Title" className={createPost.title} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <textarea placeholder="Description" className={createPost.description} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <div className={createPost.editor}>
                        <ReactQuill style={{ height: "100%" }} value={post} onChange={setPost} />
                    </div>
                </div>

                <div id="options" className={createPost.options}>
                    <div id="status" className={createPost.status}>
                        <h3>Publish</h3>
                        <span>Status: Draft</span>
                        <span>Visiblity: {isPublic ? "Public" : "Private"}</span>
                        <div className={createPost.buttonsContainer}>
                            <button className={createPost.button}>Save as draft</button>
                            <button className={isPublic ? createPost.button : `${createPost.button} ${createPost.buttonPrivate}`} onClick={() => setIsPublic(!isPublic)}>{isPublic ? "Public" : "Private"}</button>
                            <button className={createPost.publishButton} onClick={submit}>Publish</button>
                        </div>
                    </div>
                    <div id="tags" className={createPost.tags}>
                        <h3>Tags</h3>
                        <span>
                            <input type="checkbox" value={"Anime"} id="Anime" onChange={() => { tagChange("Anime") }} />
                            <label htmlFor="Anime">Anime</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"Review"} id="Review" onChange={() => { tagChange("Review") }} />
                            <label htmlFor="Review">Review</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"Rant"} id="Rant" onChange={() => { tagChange("Rant") }} />
                            <label htmlFor="Rant">Rant</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"Theory"} id="Theory" onChange={() => { tagChange("Theory") }} />
                            <label htmlFor="Theory">Theory</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"Advice"} id="Advice" onChange={() => { tagChange("Advice") }} />
                            <label htmlFor="Advice">Advice</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"ModReview"} id="ModReview" onChange={() => { tagChange("ModReview") }} />
                            <label htmlFor="ModReview">ModReview</label>
                        </span>
                        <span>
                            <input type="checkbox" value={"Tutorial"} id="Tutorial" onChange={() => { tagChange("Tutorial") }} />
                            <label htmlFor="Tutorial">Tutorial</label>
                        </span>
                        {/* <span>{tags}</span> */}

                    </div>

                </div>
            </div>

            <h1 style={{ marginTop: "30px", textAlign: "center" }}>Preview</h1>

            <Post time={`${new Date()}`} title={title} description={description} tags={tags} post={post} />

        </div>
    )
}

export default CreatePost;
