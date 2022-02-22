import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux, } from 'react-redux'
import { StoreDispatch, StoreRootState, } from '../store/store'

export const useDispatch = () => useDispatchRedux<StoreDispatch>()
export const useSelector: TypedUseSelectorHook<StoreRootState> = useSelectorRedux