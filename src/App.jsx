import { useState } from 'react'
import './App.css'
import { TURNS } from './constant'
import { Square } from './component/Square/Square'
import { restartGame, checkEndGame, checkWinner, updateBoard } from './logic/board'
import { Turns } from './component/Turns/Turns'
import { Winner } from './component/Winner/Winner'
function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const handleRestartGame = () => {
    restartGame(setWinner, setBoard)
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={handleRestartGame}>Reiniciar juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                board={board}
                setBoard={setBoard}
                turn={turn}
                setTurn={setTurn}
                winner={winner}
                setWinner={setWinner}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Turns turn={turn}></Turns>
      </section>
      <Winner winner={winner} setWinner={setWinner} setBoard={setBoard}></Winner>
    </main>
  )
}

export default App
