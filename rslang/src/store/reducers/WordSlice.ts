import { fetchWords } from './ActionCreaters';
import { createSlice } from '@reduxjs/toolkit';
import { IWordState } from '../../models/IWord.model';



const initialState: IWordState = {
    words: [],
    isLoading: false,
    error: ''
}

export const wordSlice = createSlice({
    name: 'allWords',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchWords.fulfilled.type]: (state, action) => {
            state.words = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        [fetchWords.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchWords.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default wordSlice.reducer;