import { useContext, useEffect } from "react";
import navbar from "./navbar.module.css";
import { UserContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../public/constants";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/`, { withCredentials: true })
      .then((res) => {
        if (!setUser) return;
        console.log(res.data.data);
        setUser({ username: res.data.data.username, role: res.data.data.role });
      })
      .catch(() => {});
  }, []);
  const logout = () => {
    axios
      .get(`${SERVER_URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        if (setUser) return setUser(undefined);
      })
      .catch(() => {
        alert("Cannot connect to the server");
      });
  };

  return (
    <nav className={navbar.sidebar}>
      <div className={navbar.responsivegroup}>
        <Link className={`${navbar.logoHref} `} to="/">
          <img
            id="logo"
            className={navbar.logo}
            src="https://avatars.githubusercontent.com/u/142168995?v=4"
          />
        </Link>
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} to="/">
          Home
        </Link>
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} to="/about">
          About
        </Link>
        {/* <Link className={navbar.hrefa} to="/posts">Posts</Link> */}
        {/* <Link className={navbar.hrefa} to="/projects">Projects</Link> */}
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} to="/tags">
          Tags
        </Link>
      </div>
      <div className={navbar.responsivegroup}>
        {!user
          ? [
              <Link
                key={"register"}
                className={navbar.accountButton}
                to="/register"
              >
                Register
              </Link>,
              <Link key={"login"} className={navbar.accountButton} to="/login">
                Login
              </Link>,
            ]
          : [
              user.role.indexOf(0) >= 0 || user.role.indexOf(1) >= 0 ? (
                <Link
                  key={"createpost"}
                  className={`${navbar.accountButton} ${navbar.createPost}`}
                  to="/createpost"
                >
                  Write
                </Link>
              ) : null,
              <Link
                key={"logout"}
                to="/"
                className={`${navbar.accountButton} ${navbar.logout}`}
                onClick={logout}
              >
                Logout
              </Link>,
            ]}
      </div>
    </nav>
  );
};

export default Navbar;
