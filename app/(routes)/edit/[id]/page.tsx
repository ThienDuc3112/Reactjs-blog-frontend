"use client";

import { useUserContext } from "@/app/_context/context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import toolbar from "../../../_assets/toolbarOptions.json";
import createPostCSS from "../../createpost/page.module.css";
import TAGS from "../../../_assets/tags.json";

const Edit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { user } = useUserContext();
  let [post, setPost] = useState("");
  let [isPublic, setIsPublic] = useState(true);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [tags, setTags] = useState([] as string[]);
  let [id, setId] = useState("");
  let [author, setAuthor] = useState(user?.username ?? "Anonymous");
  let [time, setTime] = useState(new Date());
  let [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              setPost(data.data.post);
              setIsPublic(data.data.isPublic);
              setTitle(data.data.title);
              setDescription(data.data.description);
              setTags(data.data.tags);
              setId(data.data.id);
              setAuthor(data.data.author);
              setTime(new Date(data.data.time));
            }
          });
        }
      })
      .catch((err) => {
        alert("Cannot get post data");
        router.push("/");
      });
  }, []);

  const tagChange = (value: string) => {
    let tagsCopy = [...tags];
    if (tagsCopy.includes(value)) {
      tagsCopy.splice(tagsCopy.indexOf(value), 1);
      setTags(tagsCopy);
    } else {
      setTags([...tagsCopy, value]);
    }
  };

  const submit = () => {
    setSubmitButtonDisabled(true);
    if (
      title.length == 0 ||
      description.length == 0 ||
      tags.length == 0 ||
      post.length == 0 ||
      id.length == 0
    ) {
      alert("Please fill in all the field");
      setSubmitButtonDisabled(false);
      return;
    }
    if (!user || (user.username != "huyen" && user.username != author)) {
      alert("You don't have permission to edit this post");
      router.push("/");
      return;
    }
    const body = {
      post,
      isPublic,
      description,
      title,
      tags,
      id,
      author,
      time,
      readTime: Math.round(post.split(" ").length / 200),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`, {
      mode: "cors",
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              console.log(data.data);
              alert(`Post has been updated`);
              router.push("/");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An internal error has happened");
        router.push("/");
      });
  };

  return (
    <div className={createPostCSS.page}>
      <h1 style={{ textAlign: "center", color: `var(--light-cyan)` }}>
        Edit your post
      </h1>

      <div className={createPostCSS.siteEditor}>
        <div id="mainContent" className={createPostCSS.mainContent}>
          <input
            type="text"
            placeholder="Title"
            className={createPostCSS.title}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Description"
            className={createPostCSS.description}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className={createPostCSS.editor}>
            <ReactQuill
              style={{ height: "100%" }}
              modules={{ toolbar }}
              value={post}
              onChange={(e) => {
                setPost(e);
              }}
            />
          </div>
        </div>

        <div id="options" className={createPostCSS.options}>
          <div id="status" className={createPostCSS.optionsBox}>
            <h3>Publish</h3>
            <span>Visiblity: {isPublic ? "Public" : "Private"}</span>
            <div className={createPostCSS.buttonsContainer}>
              {/* <button className={createPostCSS.button}>Save as draft</button> */}
              <button
                className={
                  isPublic
                    ? createPostCSS.button
                    : `${createPostCSS.button} ${createPostCSS.buttonPrivate}`
                }
                onClick={() => setIsPublic(!isPublic)}
              >
                {isPublic ? "Public" : "Private"}
              </button>
              <button
                className={createPostCSS.publishButton}
                disabled={submitButtonDisabled}
                onClick={submit}
              >
                Publish
              </button>
            </div>
          </div>

          <div
            id="url_id"
            className={`${createPostCSS.optionsBox} ${createPostCSS.marginTop}`}
          >
            <h3>Post{"'"}s ID</h3>
            <input
              type="text"
              className={createPostCSS.postIDInput}
              value={id}
              placeholder="Post's ID "
              onChange={(e) => {
                setId(e.target.value.split(" ").join("_").toLowerCase());
              }}
            />
          </div>

          <div
            id="tags"
            className={`${createPostCSS.optionsBox} ${createPostCSS.marginTop}`}
          >
            <h3>Tags</h3>
            {TAGS.map((tag) => (
              <span key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={tags.includes(tag)}
                  id={tag}
                  onChange={() => {
                    tagChange(tag);
                  }}
                />
                <label htmlFor={tag}>{tag}</label>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
