import { useContext, useState } from "react";
import createPost from "./createPost.module.css"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Post from "./post";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const CreatePost = () => {
    const TAGS = [
        "Anime",
        "Review",
        "Rant",
        "Theory",
        "Advice",
        "ModReview",
        "Tutorial"
    ]
    let navigate = useNavigate()
    const { user } = useContext(UserContext)
    let [state, setState] = useState({
        post: "",
        isPublic: true,
        title: "",
        description: "",
        tags: [] as string[],
        id: ""
    })

    const tagChange = (value: string) => {
        let tagsCopy = [...state.tags]
        if (tagsCopy.includes(value)) {
            tagsCopy.splice(tagsCopy.indexOf(value), 1)
            setState({ ...state, tags: tagsCopy })
        } else {
            setState({ ...state, tags: [...state.tags, value] })
        }
    }

    const submit = () => {
        if (
            state.title.length == 0 ||
            state.description.length == 0 ||
            state.tags.length == 0 ||
            state.post.length == 0 ||
            state.id.length == 0
        ) {
            alert("Please fill in all the field")
            return
        }
        const body = {
            ...state, readTime: Math.round(state.post.split(" ").length / 200), author: user?.username ?? "Anonymous"
        }
        axios.post(`http://localhost:6969/post/${state.id}`, body, { withCredentials: true }).then((res) => {
            if (res.data.success) {
                console.log(res.data.data)
                alert(`Post has been posted, your post's id is ${state.id}`)
                navigate("/")
            }
        }).catch((error: AxiosError) => {
            switch (error.response?.status) {
                case 401:
                    alert("You are not login")
                    break;
                case 403:
                    alert("Your session has ended, please relogin")
                    break;
                case 400:
                    alert("Duplicate post's ID, please provide another post's ID")
                    break;
                default:
                    alert("An internal error has happened")
                    break;
            }
        })
    }

    return (
        <div className={createPost.page}>
            <h1 style={{ textAlign: "center", color: `var(--light-cyan)` }}>Write your post</h1>

            <div className={createPost.siteEditor}>
                <div id="mainContent" className={createPost.mainContent} >
                    <input type="text" placeholder="Title" className={createPost.title} value={state.title} onChange={(e) => { setState({ ...state, title: e.target.value }) }} />
                    <textarea placeholder="Description" className={createPost.description} value={state.description} onChange={(e) => { setState({ ...state, description: e.target.value }) }} />
                    <div className={createPost.editor}>
                        <ReactQuill style={{ height: "100%" }} value={state.post} onChange={(e) => { setState({ ...state, post: e }) }} />
                    </div>
                </div>

                <div id="options" className={createPost.options}>

                    <div id="status" className={createPost.optionsBox}>
                        <h3>Publish</h3>
                        <span>Status: Draft</span>
                        <span>Visiblity: {state.isPublic ? "Public" : "Private"}</span>
                        <div className={createPost.buttonsContainer}>
                            <button className={createPost.button}>Save as draft</button>
                            <button className={state.isPublic ? createPost.button : `${createPost.button} ${createPost.buttonPrivate}`} onClick={() => setState({ ...state, isPublic: !state.isPublic })}>{state.isPublic ? "Public" : "Private"}</button>
                            <button className={createPost.publishButton} onClick={submit}>Publish</button>
                        </div>
                    </div>

                    <div id="url_id" className={`${createPost.optionsBox} ${createPost.marginTop}`}>
                        <h3>Post's ID</h3>
                        <input type="text" className={createPost.postIDInput} value={state.id} placeholder="Post's ID " onChange={(e) => {
                            setState({
                                ...state,
                                id: e.target.value.split(" ").join("_")
                            })
                        }} />
                    </div>

                    <div id="tags" className={`${createPost.optionsBox} ${createPost.marginTop}`}>
                        <h3>Tags</h3>
                        {TAGS.map(tag =>
                            <span key={tag}>
                                <input type="checkbox" value={tag} id={tag} onChange={() => { tagChange(tag) }} />
                                <label htmlFor={tag}>{tag}</label>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <h1 style={{ marginTop: "30px", textAlign: "center" }}>Preview</h1>

            <Post
                readTime={Math.round(state.post.split(" ").length / 200)}
                time={`${new Date()}`} title={state.title}
                description={state.description}
                tags={state.tags}
                post={state.post}
                author={user?.username ?? "anonymous"} />

        </div>
    )
}

export default CreatePost;
