import style from './Turns.module.css'

export const Turns = ({turn}) => {
  return (
    <section className={style.turns}>
      <h2>Turno de {turn}</h2>
    </section>
  )
}