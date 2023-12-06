"use client";
import { useState, useEffect } from "react";

const Verify = ({ params }: { params: { token: string } }) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify/${params.token}`)
      .then((res) => {
        setSuccess(res.ok);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {success ? "Successfully verified account" : "Failed to verify account"}
    </div>
  );
};

export default Verify;
