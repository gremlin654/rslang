import { postAPI } from './../services/PostService'
import wordSlice from './reducers/WordSlice'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import levelSlice from './reducers/WordGroupSlice'

const rootReducer = combineReducers({
  wordSlice,
  levelSlice,
  [postAPI.reducerPath]: postAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
