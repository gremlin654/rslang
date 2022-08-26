import { IWord } from '../models/IWord'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface IQuery {
  page: number
  group: number
}

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], object>({
      query: ({ page, group }: IQuery) => ({
        url: '/allWords',
        params: {
          group: group,
          page: page,
        },
      }),
    }),
  }),
})
