import post from "./post.module.css"

interface postProps {
    title: string,
    description: string,
    tags: string[],
    post: string,
    time: string,
    readTime: number,
    author: string
}

const Post = (props: postProps) => {
    const date = new Date(props.time)
    return (
        <div className={post.page}>
            <div className={post.frontMatter}>
                <h1>{props.title}</h1>
                <p>📆 Written on {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} | ⌛ {props.readTime} minute to read</p>
                <p>📋 Tags: {props.tags.join(", ")}</p>
                <p>✍️ Writer: {props.author[0].toUpperCase() + props.author.slice(1)}</p>
            </div>
            <hr />
            <div className={post.post} dangerouslySetInnerHTML={{ __html: props.post }} />
        </div>
    )
}

export default Post