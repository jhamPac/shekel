import TwitterButton from "./TwitterButton"

const Dashboard = () => {
    const login = () => {
        fetch("http://localhost:3000/api/v1/auth/twitter")
    }

    return (
        <div>
            <h1>CNFT Sweets 🍬</h1>
            <TwitterButton clickHandler={login} />
        </div>
    )
}

export default Dashboard
