import { IQeury, IWord } from '../models/IWord'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com/' }),
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], object>({
      query: ({page, group}: IQeury) => ({
        url: '/allWords',
        params: {
          page: page,
          group: group
        },
      }),
    }),
    getWordsUser: builder.query<IWord[], object>({
      query: ({page, group}: IQeury) => ({
        url: '/userWords',
        params: {
          page: page,
          group: group
        },
      }),
    }),
  }),
});