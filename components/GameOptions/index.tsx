import { FunctionComponent, } from 'react'

import * as Actions from '../../store/actions'

import { useDispatch, useSelector } from '../../hooks/useStore'
import useGameController from '../../hooks/useGameController'

const GameOptions: FunctionComponent = ({ }) => {
  const dispatch = useDispatch()

  const { encodeOptions, } = useGameController()

  const dimension = useSelector(({ options, }) => options['dimension'])
  const maxMoves = useSelector(({ options, }) => options['maxMovements'])
  const palette = useSelector(({ options, }) => options['palette'])

  const menu = useSelector(({ logic, }) => logic['menu'])

  const rangeOption = (title: string, value: number, action: keyof Pick<typeof Actions, 'updateDimension' | 'updateMaxMoves'>) => (
    <div className={'w-full flex mb-8'}>
      <p className={'w-2/3 text-slate-100 font-press'}>{title}</p>
      <div className={'w-1/3 flex justify-center'}>
        <button className={'text-slate-100 font-press select-none'} onClick={() => dispatch(Actions[action]('add'))}>+</button>
        <p className={'text-slate-100 font-press mx-2 select-none'}>{value < 10 ? `0${value}` : value}</p>
        <button className={'text-slate-100 font-press select-none'} onClick={() => dispatch(Actions[action]('sub'))}>-</button>
      </div>
    </div>
  )

  return (
    <div className={`absolute w-full h-full ${menu ? 'flex' : 'hidden'} justify-center items-center backdrop-blur-[0.085rem] transition-all`}>
      <div className={'w-4/5 h-fit bg-secondary flex flex-col items-center px-4 py-6 rounded-lg'}>
        <p className={'text-slate-100 font-press uppercase mb-10'}>Options</p>
        {rangeOption('Dimension', dimension, 'updateDimension')}
        {rangeOption('Max Moves', maxMoves, 'updateMaxMoves')}
        <div className={'w-full flex mb-8'}>
          <p className={'w-2/3 text-slate-100 font-press'}>Palette</p>
          <div className={'w-1/3 flex justify-center'}>
            {palette.map((color, index) => (
              <div key={index} className={'h-full flex-1'} style={{ backgroundColor: color, }} />
            ))}
          </div>
        </div>
        <div className={'w-full flex flex-col mb-8'}>
          <p className={'w-full text-slate-100 font-press'}>Share options</p>
          <div className={'w-full h-16 flex border-2 rounded border-slate-600'}>
            <p className={'flex-1 text-slate-100 font-press text-xxs p-1'}>
              {encodeOptions('https://paint.diegorlb.com.ar/', dimension, maxMoves, palette)}
            </p>
          </div>
        </div>
        <button className={'text-slate-100 font-press uppercase border border-green-700 py-1 px-3'} onClick={() => dispatch(Actions.toggleMenu())}>Save Options</button>
      </div>
    </div>
  );
}

export default GameOptions