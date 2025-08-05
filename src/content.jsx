import { useState, useEffect, useRef } from 'react'
import Card from './card.jsx'

export default function Content() {
    const [data, setData] = useState(null)
    const [seen, setSeen] = useState([])
    const bestScore = useRef(0)
    let score = seen.length

    let colours = []
    let size = 18
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

    function pickColour(colour) {
        if (seen.includes(colour)) {
            setSeen([])
        } else {
            if (score >= bestScore.current) bestScore.current = score + 1
            setSeen([...seen, colour])
        }
        setData(shuffle(data))
    }

    let list
    if (data) {
        console.log(data[0])
        list = data.map((colour) => <Card colour={colour} pickColour={pickColour}></Card>)
    }

    return (
        <main>
            <div className='scoreContainer'>
                <h2><b>Score:</b> {score}</h2>
                <h2><b>Best:</b> {bestScore.current}</h2>
            </div>
             <div className='cardContainer'>{data ? list : 'Loading colours...'}</div>
        </main>
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

function shuffle(array) {
    let currentIndex = array.length
    let randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
}