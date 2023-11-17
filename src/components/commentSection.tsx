import useFetch from "./useFetch";
import { SERVER_URL } from "../public/constants";
import CommentCard from "./commentCard";

interface IProps {
  postId: string;
}
const CommentSection = (props: IProps) => {
  const [data, isLoading] = useFetch(`${SERVER_URL}/comment/${props.postId}`);
  return (
    <div>
      {isLoading
        ? null
        : data.data.map((element: any) => {
            CommentCard(element);
          })}
    </div>
  );
};
