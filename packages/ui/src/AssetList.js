const AssetCard = props => {
    return (
        <div>
            <p>{`${props.asset.name}`}</p>
            <img width="64" height="64" src={props.asset.imageURL} />
            <p>-------------</p>
        </div>
    )
}

const AssetList = props => {
    return (
        <ul>
            {props.list.map((asset, i) => (
                <li key={i}>
                    <AssetCard asset={asset} />
                </li>
            ))}
        </ul>
    )
}

export default AssetList
