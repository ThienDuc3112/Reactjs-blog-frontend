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

  const submit = (e: FormEvent) => {
    e.preventDefault();
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
              alert("Register successfully");
              router.push("/login");
            }
            return;
          });
        }
      })
      .catch((err) => {
        alert(`Error: ${err?.response?.data?.message}`);
        router.push("/");
      });
  };

  return (
    <form
      className={`${loginCSS.wrapper} ${registerCSS.height}`}
      onSubmit={submit}
    >
      <h1 style={{ marginTop: "80px" }}>Register</h1>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email.toUpperCase()}
          onChange={(e) => {
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
