import { setState } from "@/app/_interfaces/setState";
import CSS from "./commentCard.module.css";
import Delete from "./delete";
import { IComment } from "@/app/_interfaces/comment";

const CommentCard = ({
  username,
  message,
  date,
  _id,
  setComments,
}: {
  username: string;
  message: string;
  date: Date;
  _id: string;
  setComments: setState<IComment[]>;
}) => {
  return (
    <div className={CSS.commentCard}>
      <div className={CSS.metadata}>
        <h3 className={CSS.username}>{username}</h3>
        <p className={CSS.date}>{date.toLocaleDateString()}</p>
      </div>
      <p className={CSS.message}>{message}</p>
      <Delete setComments={setComments} _id={_id} username={username} />
    </div>
  );
};

export default CommentCard;
