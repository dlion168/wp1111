/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Modal.css'
import React, { useEffect, useState } from "react";

export default function Modal({ restartGame, backToHome, win, gameOver}) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    return (
        // Advanced TODO: Implement the structure of Modal
        // Useful Hint: style = {{opacity: 1 or 0 }}
        <div className='modal' style = {{visibility: gameOver? "visible":"hidden"}}>
            <div className='modalWrapper'></div>
            <div className='modalContent'>
                <div className='modalResult'>{win?"WIN":"Game Over"}</div>
                <div className='modalBtnWrapper'>
                    <div className='modalBtn' onClick={restartGame}>{win?"New game":"Try again"}</div>
                    <div className='modalBtn' onClick={backToHome}>Back to home</div>
                </div>
            </div>
            <div className='modalWrapper'></div>
        </div>
        
    );
}