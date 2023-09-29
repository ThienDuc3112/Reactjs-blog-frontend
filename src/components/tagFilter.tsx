import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostCard from "./postCard"
import homeCSS from "./home.module.css"
import { UserContext } from "../App"

const TagFilter = () => {
    const { user } = useContext(UserContext)

    const param = useParams()
    const [allPost, setAllPost] = useState([] as any[])

    useEffect(() => {
        axios.get(`http://localhost:6969/post/previewall`).then(res => {
            if (res.data.success) {
                setAllPost((res.data.data as Array<any>).reverse().filter(post => post.tags.includes(param.tag)))
            }
        }).catch(err => {
            alert("Cannot connect to the server")
        })
    }, [])
    return (
        <>
            <img className={homeCSS.backgroundImg} alt="Let hope this background don't break" src="https://wallpapercave.com/wp/akHTqZe.jpg" />
            <div className={homeCSS.title}>
                <h1>Tag: {param.tag}</h1>
                <p>Showing all post with {param.tag} tag</p>
                {allPost.length == 0 ? <><br /><br /><p>There're no post about "{param.tag}" tag</p></> : null}
            </div>
            {allPost.filter((post) => post.isPublic || post?.author === user?.username || user?.username == "huyen").map(postPreview =>
                <PostCard
                    key={postPreview.id}
                    tags={postPreview.tags}
                    id={postPreview.id}
                    title={postPreview.title}
                    readTime={postPreview.readTime}
                    description={postPreview.description}
                    time={postPreview.time}
                    author={postPreview.author ?? "Anonymous"}
                />
            )}
        </>
    )
}

export default TagFilter