"use client";
import { useUserContext } from "@/app/_context/context";
import { IComment } from "@/app/_interfaces/comment";
import { setState } from "@/app/_interfaces/setState";
import { redirect } from "next/navigation";
import CSS from "@/app/_components/comments/delete.module.css";

const Delete = ({
  username,
  _id,
  setComments,
}: {
  username: string;
  _id: string;
  setComments: setState<IComment[]>;
}) => {
  const { user } = useUserContext();
  const deleteComment = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              alert("Comment deleted");
              setComments((prev) =>
                prev.filter((comment) => comment._id != _id)
              );
            }
          });
        } else {
          switch (res.status) {
            case 401:
              alert("You're not allowed to delete this message");
              break;
            case 403:
              alert("Your session has ended");
              redirect("/login");
              break;
            case 404:
              alert("Comment not found");
              break;
            default:
              alert("An error occured");
              break;
          }
        }
      })
      .catch((err) => {
        alert("There was an internal error with fetch");
      });
  };
  if (user && (user.username == username || user.role.includes(0))) {
    return (
      <div className={CSS.deleteWrapper}>
        <button onClick={deleteComment}>Delete</button>
      </div>
    );
  }
  return null;
};

export default Delete;
