export default function Card({ colour }) {
    let style = { color: colour.contrast.value, backgroundColor: colour.hex.value }
    return (
        <div class='card' style={style} onClick={() => console.log(colour.hex.value)}>{colour.name.value}</div>
    )
}