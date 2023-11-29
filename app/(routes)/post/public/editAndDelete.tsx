"use client";
import Link from "next/link";
import postWrapperCSS from "./editAndDelete.module.css";
import { useUserContext } from "@/app/_context/context";
import { useRouter } from "next/navigation";

const EditAndDelete = ({ id, author }: { id: string; author: string }) => {
  const { user } = useUserContext();
  const router = useRouter();
  const deletePost = (username: string) => {
    if (!user)
      return alert("You are not login, how did you even access this button?");
    if (user.username != username && user.username != "huyen") {
      alert("You are not allow to delete this post");
      router.push("/");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
      credentials: "include",
      mode: "cors",
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              alert("Post deleted");
              router.push("/");
            }
          });
        }
      })
      .catch((err) => {
        switch (err.response?.status) {
          case 401:
            alert("You are not login");
            router.push("/login");
            break;
          case 403:
            alert("Your session has ended");
            router.push("/login");
            break;
          case 404:
            alert("Post not found");
            router.push("/");
            break;
          default:
            alert("Internal server error");
            router.push("/");
            break;
        }
      });
  };
  return (
    <>
      {user.username == author || user.role.indexOf(0) >= 0 ? (
        <div className={postWrapperCSS.optionContainer}>
          <Link className={`${postWrapperCSS.button}`} href={`/edit?id=${id}`}>
            <label className={postWrapperCSS.center}>Edit</label>
          </Link>
          <button
            onClick={() => {
              deletePost(author);
            }}
            className={`${postWrapperCSS.button} ${postWrapperCSS.redButton}`}
          >
            <label className={postWrapperCSS.center}>Delete</label>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default EditAndDelete;
