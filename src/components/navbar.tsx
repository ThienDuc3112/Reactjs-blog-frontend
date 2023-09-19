import navbar from "./navbar.module.css"

const Navbar = () => {

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

            <a className={navbar.login}>Login</a>

        </nav >
    )
}

export default Navbar