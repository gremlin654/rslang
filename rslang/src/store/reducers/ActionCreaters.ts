import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IWord } from '../../models/IWord'

export const fetchWords = createAsyncThunk('allWords/fetchWords', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IWord[]>('https://rs-lang-back-diffickmenlogo.herokuapp.com/')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('Error')
  }
})
