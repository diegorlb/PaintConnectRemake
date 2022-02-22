import { FunctionComponent, } from 'react'
import { useDispatch, useSelector, } from '../../hooks/useStore'
import { setColor } from '../../store/actions'

const ColorSelector: FunctionComponent = ({ }) => {
  const dispatch = useDispatch()

  const colors = useSelector(({ options, }) => options['palette'])

  return (
    <div className={'w-full h-10 bg-secondary rounded-lg flex space-x-2 p-2'}>
      {colors.map((color, index) => (
        <button
          key={index}
          className={'h-full flex-1 rounded-sm border border-slate-300'}
          style={{ backgroundColor: color, }}
          onClick={() => dispatch(setColor(index))}/>
      ))}
    </div>
  )
}

export default ColorSelector