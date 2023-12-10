"use client";
import { useState } from "react";

const VerifyReset = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState();
  fetch(`${process.env.NEXT_URL_API_URL}/auth/reset`);
  return <div>VerifyReset</div>;
};

export default VerifyReset;
