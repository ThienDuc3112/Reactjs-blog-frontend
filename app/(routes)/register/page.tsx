"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import registerCSS from "./register.module.css";
import loginCSS from "../login/login.module.css";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [dupUser, setDupUser] = useState(false);
  const [dupEmail, setDupEmail] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setDisabled(true);
    if (
      user.password.length == 0 ||
      user.username.length == 0 ||
      user.email.length == 0
    ) {
      alert("Please fill all fields");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              alert(
                "A verification email has been sent to your address, please check your email for verification"
              );
              router.push("/login");
            }
            return;
          });
        } else {
          if (typeof res.json == "function") {
            res.json().then((data: { field?: string[] }) => {
              if (data.field) {
                setDupUser(data.field.includes("username"));
                setDupEmail(data.field.includes("email"));
              }
            });
          } else {
            alert("Internal error happened, please try again later");
          }
        }
      })
      .catch((err) => {
        alert(`Error: ${err?.response?.data?.message}`);
        router.push("/");
      })
      .finally(() => setDisabled(false));
  };

  return (
    <form className={`${loginCSS.wrapper}`} onSubmit={submit}>
      <h1 style={{ marginTop: "80px" }}>Register</h1>
      <span>
        <label htmlFor="username">
          Username{dupUser ? `\t${user.username} has been taken` : ""}
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username.toUpperCase()}
          className={dupUser ? loginCSS.invalid : ""}
          onChange={(e) => {
            setDupUser(false);
            setUser({
              ...user,
              username: e.target.value
                .toLowerCase()
                .trim()
                .split(" ")
                .join("_"),
            });
          }}
        />
      </span>
      <span>
        <label htmlFor="email">
          Email{dupEmail ? `\t${user.email} has already been used` : ""}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email.toUpperCase()}
          className={dupEmail ? loginCSS.invalid : ""}
          onChange={(e) => {
            setDupEmail(false);
            setUser({ ...user, email: e.target.value.toLowerCase() });
          }}
        />
      </span>
      <span>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </span>
      <button disabled={disabled} type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
