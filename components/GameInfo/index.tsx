import { FunctionComponent, useMemo, } from 'react'
import { useDispatch, useSelector, } from '../../hooks/useStore'
import { toggleMenu, } from '../../store/actions'

const GameInfo: FunctionComponent = ({ }) => {
  const dispatch = useDispatch()

  const movements = useSelector(({ game, }) => game['movements'])
  const progress = useSelector(({ game, }) => game['progress'])

  const dimension = useSelector(({ options, }) => options['dimension'])
  const maxMoves = useSelector(({ options, }) => options['maxMovements'])

  const percentage = useMemo(() => (progress * 100 / Math.pow(dimension, 2)).toFixed(2), [progress, dimension])

  return (
    <div className={'w-full h-14 bg-secondary rounded-lg flex px-2'}>
      <div className={'w-4/5 h-full flex flex-col justify-center space-y-1'}>
        <p className={'text-slate-100 font-press text-xs'}>Moves: {movements} | {maxMoves}</p>
        <p className={'text-slate-100 font-press text-xs'}>Progress: {percentage}%</p>
      </div>
      <div className={'w-1/4 h-full flex justify-end items-center'}>
        <div className={'h-4/5 aspect-square bg-white rounded-md flex justify-center items-center cursor-pointer'} onClick={() => dispatch(toggleMenu())}>
          <p className={'text-gray-800 font-press text-2xl -mb-1'}>i</p>
        </div>
      </div>
    </div>
  )
}

export default GameInfo