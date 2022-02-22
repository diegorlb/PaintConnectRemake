import { configureStore, } from '@reduxjs/toolkit'
import { gameReducer, logicReducer, optionsReducer, } from './reducers'

const store = configureStore({
  reducer: {
    options: optionsReducer,
    game: gameReducer,
    logic: logicReducer,
  },
  devTools: true,
})

export type StoreRootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export default store