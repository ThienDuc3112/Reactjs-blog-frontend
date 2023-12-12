"use client";
import { useState, FormEvent } from "react";
import login from "@/app/(routes)/login/login.module.css";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Password reset link has been sent to your email");
          router.push("/");
          return;
        } else {
          switch (res.status) {
            case 401:
              alert(
                "You've already reset in the last hour, please wait an hour"
              );
              break;
            case 404:
              alert("Account not found");
              break;
            case 500:
              alert("Server cannot send email, please try again later");
              break;
            default:
              alert("An error occurred");
              break;
          }
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Network error occurred");
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <form className={login.wrapper} onSubmit={submit}>
      <h1>Password reset</h1>
      <span>
        <label htmlFor="emai">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </span>
      <button disabled={disabled} type="submit">
        Request resest
      </button>
    </form>
  );
};

export default ResetPassword;
