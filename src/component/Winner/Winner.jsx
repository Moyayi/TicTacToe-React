import { Square } from "../Square/Square"
import { restartGame } from "../../logic/board";

export const Winner = ({winner, setWinner, setBoard}) => {

  const handleClick = () => {
    restartGame(setWinner, setBoard);
  }

  return (
      <>
        {
          winner !== null 
          && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Ganó'
                  }
                </h2>
                <header>
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={handleClick}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }
      </>
  )
}