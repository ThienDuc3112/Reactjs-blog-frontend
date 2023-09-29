import post from "./post.module.css"

interface postProps {
    title: string,
    description: string,
    tags: string[],
    post: string,
    time: string,
    readTime: number,
    author: string,
    lastEdit: Date
}

const Post = (props: postProps) => {
    const date = new Date(props.time)
    return (
        <div className={post.page}>
            <div className={post.frontMatter}>
                <h1>{props.title}</h1>
                <p>📆 Written on {`${date.toLocaleDateString("en-GB")}`} | ⌛ {props.readTime} minute to read</p>
                <p>📋 Tags: {props.tags.join(", ")}</p>
                <p>✍️ Author: {props.author[0].toUpperCase() + props.author.slice(1)}</p>
                <p>🩹 Last edited: {(new Date()).toLocaleDateString("en-GB")}</p>
            </div>
            <hr />
            <div className={post.post} dangerouslySetInnerHTML={{ __html: props.post }} />
        </div>
    )
}

export default Post