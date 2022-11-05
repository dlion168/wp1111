import React from "react";

const GameMode = ({ handleGuess, number, status }) =>{
    <>
        <p>Guess a number between 1 to 100</p>
        <input // Get the value from input
        ></input>
        <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
        >guess!</button>
        <p>{status}</p>
    </>
}
export default GameMode;