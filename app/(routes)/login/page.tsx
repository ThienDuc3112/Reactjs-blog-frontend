"use client";
import { UserContext, useUserContext } from "@/app/_context/userContext";
import { FormEvent, useContext, useState } from "react";
import login from "./page.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const globalUser = useUserContext();
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (user.password.length == 0 || user.username.length == 0) {
      alert("Please fill all fields");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.success) {
              if (globalUser.setUser != undefined) {
                globalUser.setUser({
                  username: user.username,
                  role: data.role,
                });
              }
              alert("Login successfully");
              router.push("/");
            }
            return;
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form className={login.wrapper} onSubmit={submit}>
      <h1>Login</h1>
      <span>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username.toUpperCase()}
          onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value.toLowerCase().split(" ").join("_"),
            });
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
