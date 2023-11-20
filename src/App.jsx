import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
const TURNS = {
  X: '❌', 
  O: '⭕',
}

const WINNER_COMBO = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
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

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const restartGame = () => { 
    setWinner(null)
    setBoard(Array(9).fill(null))
  }

  const updateBoard = (index) => {
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
      console.log('nadie ha ganado')
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={restartGame}>Reiniciar juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Ganó'
                  }
                </h2>
                <header className='win'>
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={restartGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }
    </main>
  )
}

export default App
