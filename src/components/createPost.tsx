import { useState } from "react";
import createPost from "./createPost.module.css"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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

    return (
        <div className={createPost.site}>
            <div id="mainContent" className={createPost.mainContent} >
                <input type="text" placeholder="Title" className={createPost.title} />
                <textarea placeholder="Description" className={createPost.description} />
                <ReactQuill value={post} onChange={setPost} />
            </div>

            <div id="options" className={createPost.options}>
                <div id="status" className={createPost.status}>
                    <h3>Publish</h3>
                    <span>Status: Draft</span>
                    <span>Visiblity: {isPublic ? "Public" : "Private"}</span>
                    <button>Save as draft</button>
                    <button>Publish</button>
                </div>
                <div id="tags" className={createPost.tags}>
                    <span>
                        <input type="checkbox" value={"anime"} name="anime" onChange={() => { tagChange("anime") }} />
                        <label htmlFor="anime">anime</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"review"} name="review" onChange={() => { tagChange("review") }} />
                        <label htmlFor="review">review</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"rant"} name="rant" onChange={() => { tagChange("rant") }} />
                        <label htmlFor="rant">rant</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"theory"} name="theory" onChange={() => { tagChange("theory") }} />
                        <label htmlFor="theory">theory</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"advice"} name="advice" onChange={() => { tagChange("advice") }} />
                        <label htmlFor="advice">advice</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"modReview"} name="modReview" onChange={() => { tagChange("modReview") }} />
                        <label htmlFor="modReview">modReview</label>
                    </span>
                    <span>
                        <input type="checkbox" value={"tutorial"} name="tutorial" onChange={() => { tagChange("tutorial") }} />
                        <label htmlFor="tutorial">tutorial</label>
                    </span>
                    <span>{tags}</span>

                </div>

            </div>
        </div>
    )
}

export default CreatePost;
