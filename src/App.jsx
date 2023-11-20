import { useEffect, useState } from 'react'
import './App.css'
import { TURNS } from './constant'
import { Square } from './component/Square/Square'
import { restartGame, checkEndGame, checkWinner } from './logic/board'
import { Turns } from './component/Turns/Turns'
import { Winner } from './component/Winner/Winner'
import confetti from 'canvas-confetti'
function App() {

  const [board, setBoard] = useState(() => {
    return localStorage.getItem('board')
    ? JSON.parse(localStorage.getItem('board'))
    : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    return localStorage.getItem('turn')
    ? localStorage.getItem('turn')
    : TURNS.X
  })
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const handleRestartGame = () => {
    restartGame(setWinner, setBoard, turn)
  }

  //Comprobamos que la partida haya terminado si recarga la página
  useEffect(() => {
    setWinner(checkWinner(board))
  }, [])


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
