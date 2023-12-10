"use client";
import { useState } from "react";
import login from "@/app/(routes)/login/login.module.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const submit = () => {
    alert("Not implemented");
  };
  return (
    <form className={login.wrapper} onSubmit={submit}>
      <h1>Password reset</h1>
      <span>
        <label htmlFor="emai">Enter your email for password reset</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email.toUpperCase()}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </span>
      <button type="submit">Request resest</button>
    </form>
  );
};

export default ResetPassword;
