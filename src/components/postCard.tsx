import postCard from "./postCard.module.css"
interface IPostcardProps {
    title: string;
    readTime: number;
    description: string;
    time: string;
    id: number;
    tags: string[]
}


const PostCard = (props: IPostcardProps) => {
    const DATEWRITTEN = new Date(props.time)
    return (
        <div className={postCard.card} >
            <a href={`/post/${props.id}`} className={postCard.fillDiv}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <hr />
                <p>📆 {DATEWRITTEN.getDate()}/{DATEWRITTEN.getMonth()}/{DATEWRITTEN.getFullYear()} | ⌛ {props.readTime} minute to read </p>
                <p>📋 Tags: {props.tags.join(", ")} </p>
            </a>
        </div>
    )

}

export default PostCard