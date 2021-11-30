import TwitterButton from "./TwitterButton"

const Dashboard = () => {
    return (
        <div>
            <h1>CNFT Sweets 🍬</h1>
            <TwitterButton clickHandler={() => console.log("click")} />
        </div>
    )
}

export default Dashboard
