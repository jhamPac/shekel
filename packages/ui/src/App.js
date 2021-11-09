import { useEffect, useState } from "react"
import AssetList from "./AssetList"

const App = () => {
    const [epoch, setEpoch] = useState(null)
    const [stakeAddress, setStakeAddress] = useState("")
    const [assets, setAssets] = useState([])

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
            const p = new URLSearchParams({
                stakeAddress: s,
            })

            const resp = await fetch(
                "http://localhost:3000/api/v1/accounts/stake/assets?" + p
            )
            const { data } = await resp.json()
            setAssets(data)
        } catch (err) {
            console.log(err)
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        getAssetsByStake(stakeAddress)
    }

    const changeHandler = e => {
        setStakeAddress(e.target.value)
    }

    return (
        <div className="App">
            <h1>CNFT Inspector</h1>
            <h2>{`Epoch: ${epoch === null ? "..." : epoch}`}</h2>
            <div style={{ marginBottom: "32px" }}>
                <form onSubmit={submitHandler}>
                    <input type="text" value={stakeAddress} onChange={changeHandler} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>{assets.length > 0 ? <AssetList list={assets} /> : null}</div>
        </div>
    )
}

export default App
