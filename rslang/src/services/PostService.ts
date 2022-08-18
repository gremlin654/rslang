import { IWord } from '../models/IWord'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], number>({
      query: (page: number) => ({
        url: '/allWords',
        params: {
          page: page,
        },
      }),
    }),
  }),
})