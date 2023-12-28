"use client";
import Link from "next/link";
import navbar from "./navbar.module.css";
import { useUserContext } from "@/app/_context/context";

const UserButtons = () => {
  const { user, setUser } = useUserContext();
  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (setUser) setUser({ username: "", role: [] });
        return;
      })
      .catch(() => {
        alert("Cannot connect to the server");
      });
  };
  return (
    <div className={navbar.responsivegroup}>
      {user.username.length == 0
        ? [
            <Link
              key={"register"}
              className={navbar.accountButton}
              href="/register"
            >
              Register
            </Link>,
            <Link key={"login"} className={navbar.accountButton} href="/login">
              Login
            </Link>,
          ]
        : [
            user.role.includes(0) || user.role.includes(1) ? (
              <Link
                key={"createpost"}
                className={`${navbar.accountButton} ${navbar.createPost}`}
                href="/createpost"
              >
                Write
              </Link>
            ) : null,
            <Link
              key={"logout"}
              href="/"
              className={`${navbar.accountButton} ${navbar.logout}`}
              onClick={logout}
            >
              Logout
            </Link>,
          ]}
    </div>
  );
};

export default UserButtons;
