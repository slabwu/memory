import { useState, useEffect } from 'react'
import Card from './card.jsx'

export default function Content() {
    const [data, setData] = useState(null)
    
    let colours = []
    let size = 12
    for (let i = 0; i < size; i++) {
        colours.push(getColour())
    }

    useEffect(() => {
        async function fetchData() {
            let colourData = await useData(colours)
            setData(colourData)
        }
        fetchData()
    }, [])

    let list
    if (data) {
        console.log(data[0])
        list = data.map((colour) => <Card colour={colour}></Card>)
    }

    return (
        <main>{data ? list : 'Loading colours...'}</main>
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

async function useData(array) {
    let requests = array.map(fetchColour)
    let dataList = await Promise.all(requests)
    return dataList
}

async function fetchColour(colour) {
    let response = await fetch(`https://www.thecolorapi.com/id?hex=${colour}`)
    let json = await response.json()
    return json
}