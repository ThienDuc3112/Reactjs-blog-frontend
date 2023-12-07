"use client";
import { useState, useEffect } from "react";
import verifyCSS from "./verify.module.css";

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
    <div className={verifyCSS.wrapper}>
      {success ? (
        <>
          <div className="card">
            <div className={verifyCSS.verifyMark}>
              <i className={`${verifyCSS.checkmark} ${verifyCSS.success}`}>✓</i>
            </div>
            <h1 className={verifyCSS.success}>Success</h1>
            <p>Your account is now verified</p>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <div className={verifyCSS.verifyMark}>
              <span className={`${verifyCSS.checkmark} ${verifyCSS.fail}`}>
                ❌
              </span>
            </div>
            <h1 className={verifyCSS.fail}>Fail</h1>
            <p>
              Cannot find or verify this account
              <br />
              Either the account has already been verified or the token is
              invalid
              <br />
              Please contact the dev for more information
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
