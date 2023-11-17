interface IComment {
  postId: string;
  date: string;
  message: string;
  username: string;
}

const CommentCard = (props: IComment) => {
  return (
    <div>
      <h2>Username</h2>
      <p>Date and time</p>
      <hr />
      <p>Message</p>
    </div>
  );
};

export default CommentCard;
