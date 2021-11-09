import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import AssetList from "../AssetList"

const Dashboard = () => {
    const [epoch, setEpoch] = useState(null)
    const [stakeAddress, setStakeAddress] = useState("")
    const [assets, setAssets] = useState([])
    const {
        isLoading,
        error,
        data: result,
    } = useQuery("blockTip", () =>
        fetch("http://localhost:3000/api/v1/blocks/tip").then(res => res.json())
    )

    useEffect(() => {
        if (result && result.data.length > 0) {
            const block = result.data[0]
            setEpoch(block.epoch)
        }
    }, [result])

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

    const epochText = (epoch, error, isLoading) => {
        if (isLoading) return "Loading, one moment please..."

        if (error) return "..."

        if (epoch !== null) return epoch
    }

    return (
        <div id="dashboard">
            <h1>CNFT Inspector</h1>
            <h2>{`Epoch: ${epochText(epoch, error, isLoading)}`}</h2>
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

export default Dashboard
