import confetti from "canvas-confetti";
import { WINNER_COMBO, TURNS } from "../constant";

export const restartGame = (setWinner, setBoard, turn) => { 
  setWinner(null)
  setBoard(Array(9).fill(null))
  saveTurnAndBoard({turn})
}
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}

export const checkWinner = (boardToCheck) => {
  //Revisar todas las combinaciones para saber ganador
  for (const combo of WINNER_COMBO){
    const [a,b,c] = combo
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]
    }
  }

  return null
}

export const updateBoard = (index, board, turn, winner, setBoard, setTurn, setWinner) => {
  //no actualizar posición si tiene algo
  if(board[index] || winner) return

  //actualizar el tablero
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)

  const newWinner= checkWinner(newBoard)
  if(newWinner){
    confetti()
    setWinner(newWinner)
  }else if (checkEndGame(newBoard)){
    setWinner(false)
  }

  saveTurnAndBoard({newBoard, newTurn})
}

const saveTurnAndBoard = ({newBoard, newTurn, turn}) => {
  if(newBoard === undefined){
    localStorage.removeItem('board')
    localStorage.setItem('turn', turn)
  }else{
    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)
  }

}