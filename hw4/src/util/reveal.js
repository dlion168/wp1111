/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  if (!board[x][y].revealed){
    board[x][y].revealed = true;
    newNonMinesCount--;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    if (board[x][y].value === 0){
      var pair ={board,newNonMinesCount}
      if(y>0){
        if (x>0)
          pair = revealed(board, x-1, y-1, newNonMinesCount)
        pair = revealed(pair.board, x, y-1, pair.newNonMinesCount)
        if (x<board.length-1)
          pair = revealed(pair.board, x+1, y-1, pair.newNonMinesCount)
      }
      if (x>0)
        pair = revealed(pair.board, x-1, y, pair.newNonMinesCount)
      if (x<board.length-1)
        pair = revealed(pair.board, x+1, y, pair.newNonMinesCount)
      if(y<board.length-1){
        if (x>0)
          pair = revealed(pair.board, x-1, y+1, pair.newNonMinesCount)
        pair = revealed(pair.board, x, y+1, pair.newNonMinesCount)
        if (x<board.length-1)  
          pair = revealed(pair.board, x+1, y+1, pair.newNonMinesCount)
      }
      board = pair.board
      newNonMinesCount = pair.newNonMinesCount
    }
  }
  return { board, newNonMinesCount };
};
