import post from "./post.module.css"

interface postProps {
    title: string,
    description: string,
    tags: string[],
    post: string
}

const Post = (props: postProps) => {
    const TIMETOREAD = Math.round(props.post.split("").length / 200)
    return (
        <>
            <div className={post.frontMatter}>
                <h1>{props.title}</h1>
                <p>📆 DD/MM/2023 | ⌛ {TIMETOREAD} minute read</p>
                <p>📋 Tags: {props.tags.join(", ")}</p>
            </div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: props.post }} />
        </>
    )
}

export default Post