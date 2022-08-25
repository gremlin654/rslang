import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState =  {
    isAuth: false,
    token: 'deafult',
    avatarUrl: 'deafult',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLogin: (state, action : PayloadAction<boolean>) => {
             state.isAuth =  action.payload;
        },
        changeToken: (state, action : PayloadAction<string>) => {
            state.token =  action.payload;
        },
        chageAvatarUrl: (state, action : PayloadAction<string>) => {
            state.avatarUrl =  action.payload;
        },
    }
});

export default loginSlice.reducer;