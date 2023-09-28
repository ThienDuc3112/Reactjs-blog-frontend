import { useContext, useEffect } from "react"
import navbar from "./navbar.module.css"
import { UserContext } from "../App"
import axios from "axios"

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        axios.get("http://localhost:6969/auth/", { withCredentials: true }).then(res => {
            if (!setUser) return;
            setUser({ username: res.data.data.username })
        }).catch(() => { })
    }, [])

    const logout = () => {
        axios.get("http://localhost:6969/auth/logout", { withCredentials: true }).then(res => {
            if (setUser) return setUser(undefined);
        }).catch(() => {
            alert("Cannot connect to the server")
        })
    }

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
                {!user ? <a className={navbar.accountButton} href="/login">Login</a> : [
                    <a className={`${navbar.accountButton} ${navbar.createPost}`} href="/createpost">Create post</a>,
                    <a className={`${navbar.accountButton} ${navbar.logout}`} onClick={logout}>Logout</a>
                ]}
            </div>

        </nav >
    )
}

export default Navbar