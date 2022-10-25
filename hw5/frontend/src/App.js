import './App.css';
import {useState} from 'react';
import {startGame, guess, restart} from './axios';
function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const handleGuess = async () => {
    setNumber(document.getElementById('inputbox').value)
    const response = await guess(number)
    if (response.split(' ')[0] === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
      document.getElementById('inputbox').value=''
    }
  }
  const game = 
    <>
        <p>Guess a number between 1 to 100</p>
        <input id="inputbox" onChange={(e)=>{setNumber(e.target.value)}} 
        onKeyDown={(e)=>{if (e.key === "Enter"){handleGuess()}}}// Get the value from input
        ></input>
        <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
        >guess!</button>
        <p>{status}</p>
    </>
    
  const startMenu =
    <div>
        <button onClick = {async () => {
          await startGame()
          setHasStarted(true)
          }}> start game </button>
    </div>
  
  const winningMode =
    <>
      <p>you won! the number was {number}</p>
      <button onClick = {async () => {
        await restart()
        setHasStarted(true)
        setHasWon(false)
        setStatus('')
      }}// Handle restart for backend and frontend
      >restart</button>
    </>

  
  return (
    <div className="App">
      {hasWon ? winningMode : hasStarted ? game : startMenu}
    </div>
    );
}

export default App;
