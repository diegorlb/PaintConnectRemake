import { FunctionComponent, useEffect, } from 'react'

import * as Actions from '../../store/actions'

import useGameController, { GAMESTATE } from '../../hooks/useGameController'
import { useDispatch, useSelector } from '../../hooks/useStore'

import ColorsCanvas from '../ColorsCanvas'
import ColorSelector from '../ColorSelector'
import GameInfo from '../GameInfo'
import GameStatus from '../GameStatus'
import GameOptions from '../GameOptions'

const GameHandler: FunctionComponent = ({ }) => {
  const dispatch = useDispatch()

  const { populateGrid, recalculateGrid, decodeOptions, } = useGameController()

  const grid = useSelector(({ game, }) => game['grid'])
  const movements = useSelector(({ game, }) => game['movements'])
  const gameState = useSelector(({ game, }) => game['gameState'])

  const selected = useSelector(({ logic, }) => logic['selected'])

  const dimension = useSelector(({ options, }) => options['dimension'])
  const maxMoves = useSelector(({ options, }) => options['maxMovements'])
  const palette = useSelector(({ options, }) => options['palette'])

  //Loads config from link, if any.
  useEffect(() => {
    if (!location) return
    dispatch(Actions.setOptions(decodeOptions(location['search'])))
  }, [])

  useEffect(() => {
    if (gameState > GAMESTATE.PLAYING) return
    dispatch(Actions.setGrid(populateGrid(dimension, palette)))
    dispatch(Actions.resetMovements())
    dispatch(Actions.resetProgress())
    dispatch(Actions.initGameState())
  }, [gameState, dimension, palette])

  useEffect(() => {
    if (selected < 0) return
    if (gameState !== GAMESTATE.PLAYING) {
      dispatch(Actions.resetColor())
      return
    }

    const [next, progress, completed] = recalculateGrid(grid, selected)

    dispatch(Actions.setGrid(next))
    dispatch(Actions.setMovements())
    dispatch(Actions.setProgress(progress))
    dispatch(Actions.resetColor())

    if (completed) dispatch(Actions.setGameState(GAMESTATE.COMPLETED))
  }, [selected, gameState, grid])

  useEffect(() => {
    if (movements >= maxMoves) dispatch(Actions.setGameState(GAMESTATE.LOST))
  }, [movements, maxMoves])

  return (
    <div className={'w-3/5 max-w-md space-y-2 relative'}>
      <GameOptions />
      <GameStatus />
      <GameInfo />
      <ColorsCanvas />
      <ColorSelector />
    </div>
  )
}

export default GameHandler