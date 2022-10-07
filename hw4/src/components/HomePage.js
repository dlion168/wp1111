/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button onClick={startGameOnClick} className="btn" disabled={boardSize*boardSize>=mineNum?false:true}> Start Game</button><br/>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className="btn" onClick={()=>{setShowPanel(p=>!p)}}> Difficulty Adjustment</button>
        <div className='controlWrapper' style={{visibility:showPanel?'visible':'hidden'}}>
          <div className='error' style={{visibility:boardSize*boardSize<=mineNum?'visible':'hidden'}}>ERROR: Mines number and board size are invalid!</div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines number</p>
              <input className='inputSlider' 
              type = 'range' min = '1' max = '100' 
              defaultValue = '10' value={mineNum} 
              onChange={(e)=>{mineNumOnChange(e.target.value)}} step="1"/>
              <p className='controlNum' style={{color:boardSize*boardSize>=mineNum?'#0f0f4b':'#880000'}}>{mineNum} </p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board size(nxn)</p>
              <input className='inputSlider' 
              type = 'range' min = '3' max = '20' 
              defaultValue = '8' value={boardSize} 
              onChange={(e)=>{boardSizeOnChange(e.target.value)}} step="1"/>
              <p className='controlNum' style={{color:boardSize*boardSize>=mineNum?'#0f0f4b':'#880000'}}>{boardSize}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default HomePage;   