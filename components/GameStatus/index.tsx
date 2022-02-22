import { FunctionComponent, useMemo, } from 'react'
import { GAMESTATE } from '../../hooks/useGameController'
import { useDispatch, useSelector } from '../../hooks/useStore'
import { resetGameState } from '../../store/actions'

const GameStatus: FunctionComponent = ({ }) => {
  const dispatch = useDispatch()

  const gameState = useSelector(({ game, }) => game['gameState'])

  const title = useMemo(() => {
    switch (gameState) {
      case GAMESTATE.COMPLETED: return 'You win :)'
      case GAMESTATE.LOST: return 'You lose :('
      default: return 'You hacked'
    }
  }, [gameState])

  const subtitle = useMemo(() => {
    switch (gameState) {
      case GAMESTATE.COMPLETED: return 'Congratulations!'
      case GAMESTATE.LOST: return 'Next time, buddy!'
      default: return 'Why did you hack? :('
    }
  }, [gameState])

  return (
    <>
      {gameState > GAMESTATE.PLAYING && (
        <div className={'absolute w-full h-full flex justify-center items-center backdrop-blur-[0.085rem]'}>
          <div className={'w-4/5 aspect-square bg-secondary rounded-md border border-slate-500 flex flex-col justify-center items-center'}>
            <p className={'text-slate-100 font-press text-xl'}>{title}</p>
            <p className={'text-slate-100 font-press text-xs mt-4 mb-12'}>{subtitle}</p>
            <button className={'min-w-32 border-2 border-green-700 rounded p-1 text-slate-100 font-press'} onClick={() => dispatch(resetGameState())}>Play again</button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameStatus