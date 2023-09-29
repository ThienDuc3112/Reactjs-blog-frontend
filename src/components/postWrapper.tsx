import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Post from "./post"
import NotFound from "./pageNotFound"
import { useContext, useEffect, useState } from "react"
import LoadingScreen from "./loadingScreen"
import postWrapperCSS from "./postWrapper.module.css"
import { UserContext } from "../App"

const PostWrapper = () => {
    const { user, setUser } = useContext(UserContext)
    const param = useParams()
    let [returnValue, setReturnValue] = useState(<LoadingScreen />)
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
                            <Link className={`${postWrapperCSS.button}`} to={`/post/edit/${param.id}`}>
                                <label className={postWrapperCSS.center}>Edit</label>
                            </Link>
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