import post from "./post.module.css";

interface postProps {
  title: string;
  description: string;
  tags: string[];
  post: string;
  time: string;
  readTime: number;
  author: string;
  lastEdit: Date;
  isPublic: boolean;
}

const Post = (props: postProps) => {
  const date = new Date(props.time);
  return (
    <div className={post.page}>
      <div className={post.frontMatter}>
        <h1>{props.title}</h1>
        <p>
          📆 Written on {`${date.toLocaleDateString("en-GB")}`} | ⌛{" "}
          {props.readTime} minute to read
        </p>
        <p>
          ✍️ Author: {props.author[0].toUpperCase() + props.author.slice(1)} |
          🩹 Last edited: {new Date().toLocaleDateString("en-GB")}
        </p>
        <p>🔎 Visiblity: {props.isPublic ? "Public" : "Private"}</p>
        <p>📋 Tags: {props.tags.join(", ")}</p>
      </div>
      <hr />
      <div>
        <h3>Description</h3>
        <p>{props.description}</p>
      </div>
      <hr />
      <h3>Content</h3>
      <div
        className={post.post}
        dangerouslySetInnerHTML={{ __html: props.post }}
      />
    </div>
  );
};

export default Post;
