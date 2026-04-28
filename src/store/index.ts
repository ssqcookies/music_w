import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './modules/counter'
import recommendReducer from "@/views/discover/children-views/recommend/store/index";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import playerReducer from '@/views/player/store/player'
const store = configureStore({
  reducer:{
    counter:counterReducer,
    recommend:recommendReducer,
    player:playerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export default store