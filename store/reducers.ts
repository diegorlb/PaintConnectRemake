import { createReducer, } from '@reduxjs/toolkit'
import * as Actions from './actions'
import { GAMESTATE, Grid, } from '../hooks/useGameController'

const optionsState = {
  dimension: 16,
  maxMovements: 32,
  palette: [
    '#FBCAEF',
    '#C41C38',
    '#FFFC31',
    '#7BB12F',
    '#068D9D',
    '#BF5F7D',
  ],
}


type gameStateType = {
  grid: Grid,
  movements: number,
  progress: number,
  gameState: GAMESTATE,
}
const gameState: gameStateType = {
  grid: [],
  movements: 0,
  progress: 0,
  gameState: GAMESTATE.PLAYING,
}


const logicState = {
  selected: -1,
  menu: false,
}

export const optionsReducer = createReducer(optionsState, (builder) => {
  builder
    .addCase(Actions.updateDimension, (state, { payload, }) => {
      if (payload === 'add') state['dimension'] += 1
      if (payload === 'sub') state['dimension'] -= 1
    })
    .addCase(Actions.updateMaxMoves, (state, { payload, }) => {
      if (payload === 'add') state['maxMovements'] += 1
      if (payload === 'sub') state['maxMovements'] -= 1
    })
})

export const gameReducer = createReducer(gameState, (builder) => {
  builder
    .addCase(Actions.setGrid, (state, { payload, }) => {
      state['grid'] = payload
    })
    .addCase(Actions.setMovements, (state, { payload, }) => {
      state['movements'] = payload || (state['movements'] + 1)
    })
    .addCase(Actions.resetMovements, (state) => {
      state['movements'] = 0
    })
    .addCase(Actions.setProgress, (state, { payload, }) => {
      state['progress'] = payload
    })
    .addCase(Actions.resetProgress, (state) => {
      state['progress'] = 0
    })
    .addCase(Actions.setGameState, (state, { payload, }) => {
      state['gameState'] = payload
    })
    .addCase(Actions.initGameState, (state) => {
      state['gameState'] = GAMESTATE.PLAYING
    })
    .addCase(Actions.resetGameState, (state) => {
      state['gameState'] = GAMESTATE.RESET
    })
})

export const logicReducer = createReducer(logicState, (builder) => {
  builder
    .addCase(Actions.setColor, (state, { payload, }) => {
      state['selected'] = payload
    })
    .addCase(Actions.resetColor, (state) => {
      state['selected'] = -1
    })
    .addCase(Actions.toggleMenu, (state) => {
      state['menu'] = !state['menu']
    })
})