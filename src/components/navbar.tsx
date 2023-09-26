import { useContext } from "react"
import navbar from "./navbar.module.css"
import { UserContext } from "../App"

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    console.log(user)
    return (
        <nav className={navbar.sidebar}>
            <div>
                <a className={navbar.logoHref} href="/"><img id="logo" className={navbar.logo} src="https://avatars.githubusercontent.com/u/142168995?v=4" /></a>
                <a className={navbar.hrefa} href="/">Home</a>
                <a className={navbar.hrefa} href="/about">About</a>
                <a className={navbar.hrefa} href="/posts">Posts</a>
                <a className={navbar.hrefa} href="/projects">Projects</a>
                <a className={navbar.hrefa} href="/tags">Tags</a>
            </div>
            <div>
                {user ? [
                    <a className={navbar.login} href="/createpost">Create post</a>,
                    <a className={navbar.login} href="/logout">Logout</a>
                ] : <a className={navbar.login} href="/login">Login</a>}
            </div>

        </nav >
    )
}

export default Navbar