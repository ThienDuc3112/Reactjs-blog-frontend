"use client";
import { useUserContext } from "@/app/_context/context";
import { FormEvent, useState } from "react";
import login from "./login.module.css";
import { useRouter } from "next/navigation";
import { post } from "@/app/_helper/post";

const Login = () => {
  const globalUser = useUserContext();
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (user.password.length == 0 || user.username.length == 0) {
      alert("Please fill all fields");
      return;
    }
    const [data, err] = await post<{ role: number[] }>(
      `/api/login`,
      user,
      true
    );
    if (data == null) {
      switch ((err as any).status) {
        case 401: {
          alert("Incorrect password");
          break;
        }
        case 404: {
          alert("User not found");
          break;
        }
        default:
          alert("Unable to login");
          break;
      }
      return;
    }
    if (globalUser.setUser != undefined) {
      globalUser.setUser({
        username: user.username,
        role: data.role,
      });
    }
    alert("Login successfully");
    router.push("/");
  };

  return (
    <form className={login.wrapper} onSubmit={submit}>
      <h1>Login</h1>
      <span>
        <label htmlFor="username">Username/email</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
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
      <span
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          type="button"
          onClick={() => {
            router.push("/resetpassword");
          }}
        >
          Forget password
        </button>
        <button type="submit">Login</button>
      </span>
    </form>
  );
};

export default Login;
