import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { IFullUser } from '../../models/IUser'
import { IUserWord } from '../../models/IWord'
import { userSlice } from '../../store/reducers/UserSlice'
import { Cards } from './Cards'

export const Difficult = () => {
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.userSlice) as IFullUser

  const getWordsUser = useCallback(async () => {
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/userWords', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  getWordsUser()
  const wordsUser = user.userWords
  console.log(wordsUser)
  return (
    <div className='wrapper'>
      <h2>Сложные слова</h2>
      <div className='cards-container'>{wordsUser && wordsUser.map((word: any) => <Cards key={word._id} word={word} />)}</div>
    </div>
  )
}
