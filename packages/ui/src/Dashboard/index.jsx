import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import TwitterButton from "./TwitterButton"

const Dashboard = () => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [value, setValue] = useState("")

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

    const changeHandler = e => setValue(e.target.value)

    const submitHandler = e => {
        e.preventDefault()
        console.log(value)
    }

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>CNFT Sweets 🍬</h1>
            <div>{user === null ? null : <p>{`Hello: ${user.handle}`}</p>}</div>
            {auth ? null : <TwitterButton clickHandler={login} />}
            {user === null ? null : (
                <div>
                    <form onSubmit={submitHandler}>
                        <p>Search for your own tweets</p>
                        <input type="text" value={value} onChange={changeHandler} />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}
        </div>
    )
}

export default Dashboard
