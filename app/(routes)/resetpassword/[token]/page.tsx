"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import loginCSS from "@/app/(routes)/login/login.module.css";

const VerifyReset = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [secondEntry, setSecondEntry] = useState("");
  const [disabled, setDisabled] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const { loading, data, err } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset/${params.token}`
  );
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    if (password != secondEntry) {
      alert("The 2 passwords are not the same");
      setDisabled(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset/${params.token}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ password, secondEntry }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Password changed successfully");
          router.push("/");
          return;
        }
        switch (res.status) {
          case 400:
            alert("The 2 passwords are not the same");
            break;
          case 401:
            alert("Reset link expired");
            break;
          case 404:
            alert("Invalid reset link");
            break;
          case 500:
            alert("Internal server error, please try again later");
            break;
          default:
            alert("An unknown error has occurred");
            break;
        }
      })
      .catch((err) => {
        alert("Networking error occurred");
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  useEffect(() => {
    if (!loading && !err) {
      setValid(true);
    }
  }, [loading, err]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (valid) {
    return (
      <form className={loginCSS.wrapper} onSubmit={submit}>
        <h1>Reset password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your password"
        />
        <input
          type="password"
          value={secondEntry}
          onChange={(e) => {
            setSecondEntry(e.target.value);
          }}
          placeholder="Enter your password again"
        />
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    );
  }
  return <div>Invalid reset link</div>;
};

export default VerifyReset;
