import userSlice from './reducers/UserSlice';
import loginSlice from './reducers/LoginSlice';
import { postAPI, registrationAPI } from './../services/PostService';
import wordSlice from './reducers/WordSlice';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    loginSlice,
    wordSlice,
    userSlice,
    [postAPI.reducerPath]: postAPI.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer
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

