"use client";
import Link from "next/link";
import navbar from "./navbar.module.css";
import { useUserContext } from "@/app/_context/context";
import { useRouter } from "next/navigation";

const UserButtons = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (setUser) setUser({ username: "", role: [] });
        router.refresh();
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
            user.role.indexOf(0) >= 0 || user.role.indexOf(1) >= 0 ? (
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
