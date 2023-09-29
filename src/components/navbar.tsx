import { useContext, useEffect } from "react"
import navbar from "./navbar.module.css"
import { UserContext } from "../App"
import axios from "axios"
import { Link } from "react-router-dom"

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
                <Link className={navbar.logoHref} to="/"><img id="logo" className={navbar.logo} src="https://avatars.githubusercontent.com/u/142168995?v=4" /></Link>
                <Link className={navbar.hrefa} to="/">Home</Link>
                <Link className={navbar.hrefa} to="/about">About</Link>
                {/* <Link className={navbar.hrefa} to="/posts">Posts</Link> */}
                {/* <Link className={navbar.hrefa} to="/projects">Projects</Link> */}
                <Link className={navbar.hrefa} to="/tags">Tags</Link>
            </div>
            <div>
                {!user ? <Link className={navbar.accountButton} to="/login">Login</Link> : [
                    <Link key={"a"} className={`${navbar.accountButton} ${navbar.createPost}`} to="/createpost">Create post</Link>,
                    <a key={"b"} className={`${navbar.accountButton} ${navbar.logout}`} onClick={logout}>Logout</a>
                ]}
            </div>

        </nav >
    )
}

export default Navbar