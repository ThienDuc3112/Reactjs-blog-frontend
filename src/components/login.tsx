import { FormEvent, useContext, useState } from "react"
import login from "./login.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"


const Login = () => {
    const navigate = useNavigate()
    const globalUser = useContext(UserContext)

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()
        if (user.password.length == 0 || user.username.length == 0) {
            alert("Please fill all fields")
            return
        }
        axios.post("https://blogbackend-uihh.onrender.com/auth/login", user, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    console.log(globalUser)
                    if (globalUser.setUser != undefined) { globalUser.setUser({ username: user.username }) }

                    alert("Login successfully")
                    navigate("/")
                }
                return
            })
            .catch((err) => {
                alert(err?.response?.data?.message)
            })
    }

    return (
        <form className={login.wrapper} onSubmit={submit}>
            <h1>Login</h1>
            <span>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={user.username.toUpperCase()} onChange={(e) => {
                    setUser({ ...user, username: e.target.value.toLowerCase().split(" ").join("_") })
                }} />
            </span>
            <span>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={user.password} onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }} />
            </span>
            <button type="submit">Login</button>
        </form>
    )

}

export default Login