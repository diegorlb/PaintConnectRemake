import { createAction, } from '@reduxjs/toolkit'
import { GAMESTATE, Grid, } from '../hooks/useGameController'

export const setGrid = createAction<Grid>('initGrid')

export const setMovements = createAction<number>('setMovements')
export const resetMovements = createAction('resetMovements')

export const setProgress = createAction<number>('setProgress')
export const resetProgress = createAction('resetProgress')

export const setGameState = createAction<GAMESTATE>('setGameState')
export const initGameState = createAction('initGameState')
export const resetGameState = createAction('resetGameState')

export const setColor = createAction<number>('setColor')
export const resetColor = createAction('resetColor')

export const toggleMenu = createAction('toggleMenu')

export const updateDimension = createAction<'add' | 'sub'>('updateDimension')
export const updateMaxMoves = createAction<'add' | 'sub'>('updateMaxMoves')

export const setOptions = createAction<{ dim: number, max: number, pal: Array<string>, }>('setOptions')