import styled from "styled-components"

const AssetCard = props => {
    return (
        <Card>
            <div>
                <p>{`${props.asset.name}`}</p>
                <img width="64" height="64" src={props.asset.imageURL} />
            </div>
        </Card>
    )
}

const AssetList = props => {
    return (
        <Container>
            {props.list.map((asset, i) => (
                <AssetCard asset={asset} key={i} />
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Card = styled.div`
    border: solid 1px black;
    width: 30%;
    margin-bottom: 16px;
    padding: 8px;

    display: flex;
    justify-content: center;
`

export default AssetList
