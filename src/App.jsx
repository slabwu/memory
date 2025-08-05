import Content from './content.jsx'
import getColour from './colour.jsx'
import './App.css'

function App() {
  let text = 'the colour game'
  let title = text.split('').map(letter => <span style={{color: `#${getColour()}`}}>{letter}</span>)

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <Content></Content>
    </>
  )
}

export default App