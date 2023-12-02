const CommentCard = ({
  username,
  message,
  date,
}: {
  username: string;
  message: string;
  date: Date;
}) => {
  return (
    <div>
      <h3>{username}</h3>
      <sub>{date.toLocaleDateString()}</sub>
      <p>{message}</p>
      <sub>I have not design this thing yet</sub>
      <hr />
    </div>
  );
};

export default CommentCard;
