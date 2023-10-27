import { Link } from "react-router-dom";
import postCard from "./postCard.module.css";
interface IPostcardProps {
  title: string;
  readTime: number;
  description: string;
  time: string;
  id: number;
  tags: string[];
  author: string;
}

const PostCard = (props: IPostcardProps) => {
  const DATEWRITTEN = new Date(props.time);
  return (
    <div className={postCard.card}>
      <Link to={`/post/${props.id}`} className={postCard.fillDiv}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <hr />
        <p>
          📆 {DATEWRITTEN.getDate()}/{DATEWRITTEN.getMonth()}/
          {DATEWRITTEN.getFullYear()} | ⌛ {props.readTime} minute to read{" "}
        </p>
        <p>
          ✍️ Author: {props.author[0].toUpperCase() + props.author.slice(1)}
        </p>
        <p>📋 Tags: {props.tags.join(", ")} </p>
      </Link>
    </div>
  );
};

export default PostCard;
