import { useState } from 'react'

export default function Content() {
    const [date, setData] = useState(null)
    
    for (let i = 0; i < 10; i++) {
        console.log(getColour())
    }

    return (
        <main>Main</main>
    )
}

function getColour() {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < 6; i++) {
        output += hex.charAt(Math.floor(Math.random() * 16))
    }
    return output
}