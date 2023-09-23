import axios from "axios"
import { useParams } from "react-router-dom"
import Post from "./post"
import NotFound from "./pageNotFound"
import { useEffect, useState } from "react"
import LoadingScreen from "./loadingScreen"

const PostWrapper = () => {
    const param = useParams()
    let [returnValue, setReturnValue] = useState(<LoadingScreen />)
    useEffect(() => {
        axios.get(`http://localhost:6969/post/${param.id}`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    setReturnValue(<Post
                        readTime={data.readTime}
                        tags={data.tags}
                        description={data.description}
                        post={data.post}
                        time={data.time}
                        title={data.title} />
                    )
                }
            }).catch(error => {
                console.error(error)
                setReturnValue(<NotFound />)
            })
    }, [])
    return returnValue
}

export default PostWrapper