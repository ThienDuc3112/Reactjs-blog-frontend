import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import Post from "./post"
import NotFound from "./pageNotFound"
import { useContext, useEffect, useState } from "react"
import LoadingScreen from "./loadingScreen"
import postWrapperCSS from "./postWrapper.module.css"
import { UserContext } from "../App"


const PostWrapper = () => {
    const { user } = useContext(UserContext)
    const param = useParams()
    const navigate = useNavigate()
    let [returnValue, setReturnValue] = useState(<LoadingScreen />)

    const deletePost = (username: string) => {
        if (!user) return alert("You are not login, how did you even access this button?")
        if (user.username != username && user.username != "huyen") {
            alert("You are not allow to delete this post")
            navigate("/")
            return
        }
        axios.delete(`http://localhost:6969/post/${param.id}`, { withCredentials: true }).then((res) => {
            if (res.data.success) {
                alert("Post deleted")
                navigate("/")
            }
        }).catch((err) => {
            switch (err.response?.status) {
                case 401:
                    alert("You are not login")
                    navigate("/login")
                    break;
                case 403:
                    alert("Your session has ended")
                    navigate("/login")
                    break;
                case 404:
                    alert("Post not found")
                    navigate("/")
                    break;
                default:
                    alert("Internal server error")
                    navigate("/")
                    break;
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:6969/post/${param.id}`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    setReturnValue(<>
                        <Post
                            author={data.author ?? "Anonymous"}
                            readTime={data.readTime}
                            tags={data.tags}
                            description={data.description}
                            post={data.post}
                            time={data.time}
                            title={data.title}
                            lastEdit={data.lastEdit}
                        />
                        {user?.username == data.author || user?.username == "huyen" ?
                            <div className={postWrapperCSS.optionContainer}>
                                <Link className={`${postWrapperCSS.button}`} to={`/post/edit/${param.id}`}>
                                    <label className={postWrapperCSS.center}>Edit</label>
                                </Link>
                                <button onClick={() => { deletePost(data.author) }} className={`${postWrapperCSS.button} ${postWrapperCSS.redButton}`}>
                                    <label className={postWrapperCSS.center}>Delete</label>
                                </button>
                            </div>
                            :
                            null
                        }
                    </>)
                }
            }).catch(error => {
                console.error(error)
                setReturnValue(<NotFound />)
            })
    }, [])
    return returnValue
}

export default PostWrapper