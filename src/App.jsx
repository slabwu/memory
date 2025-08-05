import Content from './content.jsx'
import './App.css'

function App() {
  let title = ['c', 'o', 'l', 'o', 'u', 'r']
  let colour = title.map(letter => <span style={{color: getColour()}}>{letter}</span>)

  return (
    <>
      <header>
        <h1>the {colour} game</h1>
        <h2>Don't click any colour more than once! Can you get all eighteen?</h2>
      </header>
      <Content></Content>
    </>
  )
}

export default App

function getColour() {
    const hex = '0123456789ABCDE'
    let output = '#'
    for (let i = 0; i < 6; i++) {
        output += hex.charAt(Math.floor(Math.random() * 15))
    }
    return output
}