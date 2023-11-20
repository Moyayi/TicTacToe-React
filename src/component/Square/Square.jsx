import { updateBoard } from "../../logic/board"
export const Square = (
  {
    children, isSelected, index, board, setBoard, turn, setTurn,
    winner, setWinner
  }
) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index, board, turn, winner, setBoard, setTurn, setWinner)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}