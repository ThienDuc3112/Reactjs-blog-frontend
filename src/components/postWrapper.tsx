import axios from "axios"
import { useParams } from "react-router-dom"
import Post from "./post"
import NotFound from "./pageNotFound"
import { useEffect, useState } from "react"

const PostWrapper = () => {
    const param = useParams()
    let [returnValue, setReturnValue] = useState(<NotFound />)
    useEffect(() => {
        axios.get(`http://localhost:6969/post/getpost/${param.id}`).then(res => {
            if (res.data.success) {
                const data = res.data.data
                setReturnValue(<Post
                    tags={data.tags}
                    description={data.description}
                    post={data.post}
                    time={data.time}
                    title={data.title} />
                )
            }
        })
    })
    return returnValue
}

export default PostWrapper