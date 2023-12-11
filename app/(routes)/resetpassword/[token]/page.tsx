"use client";
import { useEffect, useState, FormEvent } from "react";

const VerifyReset = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState("");
  const [secondEntry, setSecondEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Not implemented");
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset/${params.token}`)
      .then((res) => {
        setLoading(false);
        setValid(res.ok);
      })
      .catch((err) => {});
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  if (valid) {
    return (
      <form onSubmit={submit}>
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
        <button type="submit">Submit</button>
      </form>
    );
  }
  return <div>VerifyReset</div>;
};

export default VerifyReset;
