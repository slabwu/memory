import { useState, useEffect, useRef } from 'react'
import Card from './card.jsx'
import getColour from './colour.jsx'
import Loader from './loader.jsx'

export default function Content() {
    const [data, setData] = useState(null)
    const [seen, setSeen] = useState([])
    const bestScore = useRef(0)
    let score = seen.length
    let size = 18
    let win = bestScore.current === size

    useEffect(() => {
        setData(null)
        async function fetchData() {
            let colourData = await useData(getColourArray(size))
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
        list = data.map((colour) => <Card key={colour.hex.value} colour={colour} pickColour={pickColour}></Card>)
    }

    let text
    if (win) {
        text = '🎉 You won! 🎉'.split('').map(letter => <span style={{color: `#${getColour()}`}}>{letter}</span>)
    } else {
        text = "Don't click any colour more than once! Can you get all eighteen?"
    }

    return (
        <main>
            <h2>{text}</h2>
            <div className='scoreContainer'>
                <h2><b>Score:</b> {score}</h2>
                <h2><b>Best:</b> {bestScore.current}</h2>
            </div>
             <div className='cardContainer'>{data ? list : <Loader></Loader>}</div>
             <button onClick={() => {
                setData(null)
                async function fetchData() {
                    let colourData = await useData(getColourArray(size))
                    setData(colourData)
                }
                fetchData()
             }}>Reset</button>
        </main>
    )
}
                
function getColourArray(size) {
    let output = []
        for (let i = 0; i < size; i++) {
        output.push(getColour())
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