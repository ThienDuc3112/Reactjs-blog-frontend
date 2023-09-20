import post from "./post.module.css"

interface postProps {
    title: string,
    description: string,
    tags: string[],
    post: string,
    time: string,
    readTime: number
}

const Post = (props: postProps) => {
    const date = new Date(props.time)
    return (
        <div className={post.page}>
            <div className={post.frontMatter}>
                <h1>{props.title}</h1>
                <p>📆 {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} | ⌛ {props.readTime} minute to read</p>
                <p>📋 Tags: {props.tags.join(", ")}</p>
            </div>
            <hr />
            <div className={post.post} dangerouslySetInnerHTML={{ __html: props.post }} />
        </div>
    )
}

export default Post