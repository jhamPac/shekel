import { useEffect, useState } from "react"
import "./App.css"

const App = () => {
    const [epoch, setEpoch] = useState(null)

    useEffect(() => {
        getLatestTip()
    }, [])

    const getLatestTip = async () => {
        try {
            const resp = await fetch("http://localhost:3000/api/v1/blocks/tip")
            const { data } = await resp.json()
            const block = data[0]

            setEpoch(block.epoch)
        } catch (err) {
            setEpoch("Error one moment")
        }
    }

    return (
        <div className="App">
            <h1>Cardano Inspector API</h1>
            <h2>{`Epoch: ${epoch === null ? "..." : epoch}`}</h2>
        </div>
    )
}

export default App
