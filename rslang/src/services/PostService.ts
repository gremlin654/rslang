import { useAppSelector } from './../hooks/redux';
import { IUser, IStatistics, ISettingsValue } from './../models/IUser';
import { IWord } from '../models/IWord'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'



interface IQeury {
  page: number
  group: number
}

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
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
  }),
});

export const registrationAPI = createApi({
  reducerPath: 'registrationAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, {email: string, password: string}>({
      query: ({email, password}) => ({
        url: '/signin',
        method: 'POST',
        body: {email, password}
      }),
    }),
    register: builder.mutation<IUser, {name?: string, email: string, password: string}>({
      query: ({email, password, name}) => ({
        url: '/signup',
        method: 'POST',
        body : {email, password, name},
      }),
    }),
  }),
});

// const token = localStorage.key(0) === 'user' ? JSON.parse(localStorage.getItem('user') || '{}').data.token : null;
// export const statisticsAPI = createApi({
//   reducerPath: 'statisticsAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
//   endpoints: (builder) => ({
//     getStatistics: builder.mutation<IStatistics, {correctArr: Array<string>, failArr: Array<string>, seriesArr: Array<string>, gameName: string }>({
//       query: () => ({
//         url: '/statistics',
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer '${token}'`
//         }
//       }),
//     }),
//   }),
// });

// export const settingsAPI = createApi({
//   reducerPath: 'settingsAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://rs-lang-back-diffickmenlogo.herokuapp.com' }),
//   endpoints: (builder) => ({
//     getSettings: builder.mutation<IUser,{user: IUser, settingName: string, settingValue: boolean | number}>({
//       query: ({user, settingName, settingValue}) => ({
//         url: '/settings',
//         method: 'POST',
//         body: {user, settingName, settingValue},
//       }),
//     }),
//   }),
// })
