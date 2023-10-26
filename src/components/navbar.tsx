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
        setUser({ username: res.data.data.username });
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
      <div>
        <Link className={`${navbar.logoHref} `} to="/">
          <img
            id="logo"
            className={navbar.logo}
            src="https://avatars.githubusercontent.com/u/142168995?v=4"
          />
        </Link>
        <input
          type="checkbox"
          name="navCheck"
          id="navcheck"
          className={navbar.checkbox}
        />
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
      <div className={navbar.responsive}>
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
              <Link
                key={"createpost"}
                className={`${navbar.accountButton} ${navbar.createPost}`}
                to="/createpost"
              >
                Create post
              </Link>,
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
      <div className={navbar.navbtn}>
        <label htmlFor="navcheck">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
