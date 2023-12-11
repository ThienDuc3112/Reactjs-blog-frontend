"use client";
import { useUserContext } from "@/app/_context/context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import toolbar from "@/app/_assets/toolbarOptions.json";
import createPostCSS from "@/app/(routes)/createpost/page.module.css";
import TAGS from "@/app/_assets/tags.json";
import { useFetch } from "@/app/_hooks/useFetch";

const Edit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUserContext();
  let [post, setPost] = useState("");
  let [isPublic, setIsPublic] = useState(true);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [tags, setTags] = useState([] as string[]);
  let [id, setId] = useState("");
  let [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { loading, data, err } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${searchParams.get("id")}`,
    true
  );
  useEffect(() => {
    if (!loading && data?.success) {
      setPost(data.data.post);
      setIsPublic(data.data.isPublic);
      setTitle(data.data.title);
      setDescription(data.data.description);
      setTags(data.data.tags);
      setId(data.data.id);
    }
    if (!loading && err) {
      alert("Cannot get post data");
      router.push("/");
    }
  }, [loading]);

  if (loading || (!loading && err)) {
    return <div>Loading</div>;
  }

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
    const body = {
      post,
      isPublic,
      description,
      title,
      tags,
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${searchParams.get("id")}`, {
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
        } else {
          switch (res.status) {
            case 401:
              alert("You are unauthorized");
              router.push("/");
              break;
            case 403:
              alert("Your session has ended, please relogin");
              break;
            case 400:
              alert("Duplicate post's ID, please provide another post's ID");
              break;
            default:
              alert("An internal error has happened");
              break;
          }
        }
      })
      .catch((error) => {
        alert("An internal error has happened");
        router.push("/");
      })
      .finally(() => setSubmitButtonDisabled(false));
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
            <h3>Update</h3>
            <span>Visiblity: {isPublic ? "Public" : "Private"}</span>
            <div className={createPostCSS.buttonsContainer}>
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
                Update
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
              disabled
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
