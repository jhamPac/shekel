import { useEffect, useState } from "react"

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

    const getAssetsByStake = async s => {
        try {
            const resp = await fetch(
                "http://localhost:3000/api/v1/accounts/" + s + "/addresses/assets"
            )
            const { data } = await resp.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    const clickHandler = e => {
        getAssetsByStake("")
    }

    return (
        <div className="App">
            <h1>Cardano Inspector API</h1>
            <h2>{`Epoch: ${epoch === null ? "..." : epoch}`}</h2>
            <div>
                <button onChange={}>Submit</button>
            </div>
        </div>
    )
}

export default App
