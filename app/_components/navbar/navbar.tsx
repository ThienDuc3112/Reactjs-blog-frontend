import Link from "next/link";
import navbar from "./navbar.module.css";
import UserButtons from "./userButton";

const Navbar = () => {
  return (
    <nav className={navbar.sidebar}>
      <div className={navbar.responsivegroup}>
        <Link className={`${navbar.logoHref} `} href="/">
          <img
            id="logo"
            className={navbar.logo}
            src="https://avatars.githubusercontent.com/u/142168995?v=4"
            alt="logo"
          />
        </Link>
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} href="/">
          Home
        </Link>
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} href="/about">
          About
        </Link>
        {/* <Link className={navbar.hrefa} href="/posts">Posts</Link> */}
        {/* <Link className={navbar.hrefa} href="/projects">Projects</Link> */}
        <Link className={`${navbar.hrefa} ${navbar.responsive}`} href="/tags">
          Tags
        </Link>
      </div>
      <UserButtons />
    </nav>
  );
};

export default Navbar;
