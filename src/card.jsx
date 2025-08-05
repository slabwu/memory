export default function Card({ colour, pickColour }) {
    let style = { color: colour.contrast.value, backgroundColor: colour.hex.value }
    return (
        <div className='card' style={style} onClick={() => pickColour(colour.hex.value)}>{colour.name.value}</div>
    )
}