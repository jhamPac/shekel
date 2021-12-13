import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import TwitterButton from "./TwitterButton"

const Dashboard = () => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)

    const { isLoading, data: result } = useQuery("success-login", () =>
        fetch("http://localhost:3000/api/v1/auth/twitter/login/success", {
            credentials: "include",
        }).then(res => res.json())
    )

    useEffect(() => {
        if (result && result.error === false) {
            setAuth(true)
            setUser(result.user)
        } else {
            setAuth(false)
        }
    }, [result])

    const login = () => {
        window.open("http://localhost:3000/api/v1/auth/twitter", "_self")
    }

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>CNFT Sweets 🍬</h1>
            <div>{user === null ? null : <p>{`Hello: ${user.handle}`}</p>}</div>
            {auth ? null : <TwitterButton clickHandler={login} />}
        </div>
    )
}

export default Dashboard
