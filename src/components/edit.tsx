import axios, { AxiosError } from "axios"
import Post from "./post"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import TAGS from "../public/tags.json"
import ReactQuill from "react-quill"
import createPostCSS from "./createPost.module.css"

const Edit = () => {
    const param = useParams()
    let navigate = useNavigate()
    const { user } = useContext(UserContext)
    let [post, setPost] = useState("")
    let [isPublic, setIsPublic] = useState(true)
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [tags, setTags] = useState([] as string[])
    let [id, setId] = useState("")
    let [author, setAuthor] = useState(user?.username ?? "Anonymous")
    let [time, setTime] = useState(new Date())

    useEffect(() => {
        axios.get(`http://localhost:6969/post/${param.id}`).then((res) => {
            if (res.data.success) {
                const data = res.data.data
                setPost(data.post)
                setIsPublic(data.isPublic)
                setTitle(data.title)
                setDescription(data.description)
                setTags(data.tags)
                setId(data.id)
                setAuthor(data.author)
                setTime(new Date(data.time))
            }
        }).catch((err) => {
            alert("Cannot get post data")
            navigate("/")
        })
    }, [])

    const tagChange = (value: string) => {
        let tagsCopy = [...tags]
        if (tagsCopy.includes(value)) {
            tagsCopy.splice(tagsCopy.indexOf(value), 1)
            setTags(tags)
        } else {
            setTags([...tags, value])
        }
    }

    const submit = () => {
        if (
            title.length == 0 ||
            description.length == 0 ||
            tags.length == 0 ||
            post.length == 0 ||
            id.length == 0
        ) {
            alert("Please fill in all the field")
            return
        }
        if (!user || (user.username != "huyen" && user.username != author)) {
            alert("You don't have permission to edit this post")
            navigate("/")
            return
        }
        const body = {
            post, isPublic, description, title, tags, id, author, time, readTime: Math.round(post.split(" ").length / 200)
        }
        axios.patch(`http://localhost:6969/post/${id}`, body, { withCredentials: true }).then((res) => {
            if (res.data.success) {
                console.log(res.data.data)
                alert(`Post has been updated`)
                navigate("/")
            }
        }).catch((error: AxiosError) => {
            alert("An internal error has happened")
            navigate("/")
        })
    }

    return (
        <div className={createPostCSS.page}>
            <h1 style={{ textAlign: "center", color: `var(--light-cyan)` }}>Edit your post</h1>

            <div className={createPostCSS.siteEditor}>
                <div id="mainContent" className={createPostCSS.mainContent} >
                    <input type="text" placeholder="Title" className={createPostCSS.title} value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <textarea placeholder="Description" className={createPostCSS.description} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <div className={createPostCSS.editor}>
                        <ReactQuill style={{ height: "100%" }} value={post} onChange={(e) => { setPost(e) }} />
                    </div>
                </div>

                <div id="options" className={createPostCSS.options}>

                    <div id="status" className={createPostCSS.optionsBox}>
                        <h3>Publish</h3>
                        <span>Status: Draft</span>
                        <span>Visiblity: {isPublic ? "Public" : "Private"}</span>
                        <div className={createPostCSS.buttonsContainer}>
                            <button className={createPostCSS.button}>Save as draft</button>
                            <button className={isPublic ? createPostCSS.button : `${createPostCSS.button} ${createPostCSS.buttonPrivate}`} onClick={() => setIsPublic(!isPublic)}>{isPublic ? "Public" : "Private"}</button>
                            <button className={createPostCSS.publishButton} onClick={submit}>Publish</button>
                        </div>
                    </div>

                    <div id="url_id" className={`${createPostCSS.optionsBox} ${createPostCSS.marginTop}`}>
                        <h3>Post's ID</h3>
                        <input type="text" className={createPostCSS.postIDInput} value={id} placeholder="Post's ID " onChange={(e) => { setId(e.target.value.split(" ").join("_")) }} />
                    </div>

                    <div id="tags" className={`${createPostCSS.optionsBox} ${createPostCSS.marginTop}`}>
                        <h3>Tags</h3>
                        {TAGS.map(tag =>
                            <span key={tag}>
                                <input type="checkbox" value={tag} checked={tags.includes(tag)} id={tag} onChange={() => { tagChange(tag) }} />
                                <label htmlFor={tag}>{tag}</label>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <h1 style={{ marginTop: "30px", textAlign: "center" }}>Preview</h1>

            <Post
                readTime={Math.round(post.split(" ").length / 200)}
                time={`${time}`} title={title}
                description={description}
                tags={tags}
                post={post}
                author={author}
                lastEdit={new Date()}
            />

        </div>
    )
}

export default Edit