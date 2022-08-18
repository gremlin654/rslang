import { postAPI } from './../services/PostService';
import wordReduser from './reducers/WordSlice';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    wordReduser,
    [postAPI.reducerPath]: postAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

