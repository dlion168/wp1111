/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    console.log("guess",guess,!guess)
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            {/* ↓ Default row, you should modify it. ↓ */}
            {!guess ?
                <div className='Row-wrapper'>
                    <div className={'Row-wordbox'} id={rowIdx+'-0'} key={rowIdx+'-0'}></div>
                    <div className={'Row-wordbox'} id={rowIdx+'-1'} key={rowIdx+'-1'}></div>
                    <div className={'Row-wordbox'} id={rowIdx+'-2'} key={rowIdx+'-2'}></div>
                    <div className={'Row-wordbox'} id={rowIdx+'-3'} key={rowIdx+'-3'}></div>                        
                    <div className={'Row-wordbox'} id={rowIdx+'-4'} key={rowIdx+'-4'}></div>
                </div>:
                <div className='Row-wrapper'>
                    <div className={'Row-wordbox '+guess[0].color} id={rowIdx+'-0'} key={rowIdx+'-0'}>{guess[0].char}</div>
                    <div className={'Row-wordbox '+guess[1].color} id={rowIdx+'-1'} key={rowIdx+'-1'}>{guess[1].char}</div>
                    <div className={'Row-wordbox '+guess[2].color} id={rowIdx+'-2'} key={rowIdx+'-2'}>{guess[2].char}</div>
                    <div className={'Row-wordbox '+guess[3].color} id={rowIdx+'-3'} key={rowIdx+'-3'}>{guess[3].char}</div>
                    <div className={'Row-wordbox '+guess[4].color} id={rowIdx+'-4'} key={rowIdx+'-4'}>{guess[4].char}</div>
                </div>
            }
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;