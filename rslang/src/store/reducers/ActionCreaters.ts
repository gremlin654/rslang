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

export const setLevelAndPage = createAsyncThunk('levelWords/setLevelAndPage', async (query: { group: number; page: number }, { rejectWithValue }) => {
  try {
    const { page, group } = query
    const response = await axios.get<IWord[]>(`https://rs-lang-back-diffickmenlogo.herokuapp.com/allWords?group=${group}&page=${page}`)
    return response.data
  } catch (error) {
    return rejectWithValue('Error')
  }
})

interface ISetings {
  token: string
  gameName: string
  correctAnswers: IWord[]
  failAnswers: IWord[]
  allSeries: number[]
}
export const postStats = createAsyncThunk('levelWords/postStats', async (setings: ISetings, { rejectWithValue }) => {
  try {
    const config = {
      method: 'POST',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${setings.token}`,
      },
      body: JSON.stringify({
        gameName: setings.gameName,
        correctArr: setings.correctAnswers,
        failArr: setings.failAnswers,
        seriesArr: setings.allSeries,
      }),
    }
    const response = await axios.post('https://rs-lang-back-diffickmenlogo.herokuapp.com/statistics', config)
    return { text: response.statusText, code: response.status }
  } catch (error) {
    return rejectWithValue('Error')
  }
})
