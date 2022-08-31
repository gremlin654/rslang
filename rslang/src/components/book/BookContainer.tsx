import React, { useEffect, useState } from 'react'
import { IUserWord, IWord, IWordState } from '../../models/IWord'
import { postAPI } from '../../services/PostService'
import { Book } from './Book'
import '../../style/words.scss'
import { Button, ButtonGroup, Pagination, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { wordSlice } from '../../store/reducers/WordSlice'
import { useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import { wordSliceUser } from '../../store/reducers/UserWords'
import { Difficult } from './Difficult'
import { Link } from 'react-router-dom'
import { IFullUser } from '../../models/IUser'
import { setLevelAndPage } from '../../store/reducers/ActionCreaters'

export const BookContainer = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.wordSlice.page) as number
  const group = useAppSelector((state) => state.wordSlice.group) as number
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const setUserWords = wordSliceUser.actions.getUserWords
  const setPage = wordSlice.actions.setPage
  const setGroup = wordSlice.actions.setGroup
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery({ page, group })
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const [arr, setArr] = useState([])

  useEffect(() => {
    const arrUser: any = words?.map((word) => {
      const foundWord = user.userWords.find((wordUser: any) => `${wordUser._id}` === `${word._id}`)
      if (foundWord) {
        return (word = {
          ...word,
          deleted: foundWord.deleted,
          difficult: foundWord.difficult,
          correct: foundWord.correct,
          fail: foundWord.fail,
        })
      }
      return (word = {
        ...word,
        correct: 0,
        fail: 0,
      })
    })
    setArr(arrUser)
    console.log(arrUser)
  }, [words])
  return (
    <div className='wrapper'>
      <div className='game-btn__container'>
        <button className='game__btn'>
          <Link to='/games/sprint' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Спринт
          </Link>
        </button>
        <button className='game__btn'>
          <Link to='/games/audio_chalenge' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Аудиовызов
          </Link>
        </button>
      </div>
      <div className='btn-difficult'>
        <Link to='/book/difficult'>Сложные слова</Link>
      </div>
      <div>
        <Link to='/book/level'>Level A1</Link>
      </div>
      <ButtonGroup variant='contained' aria-label='outlined primary button group'>
        <Button
          onClick={() => {
            dispatch(setGroup(0))
          }}
        >
          Beginner(A1)
        </Button>
        <Button
          onClick={() => {
            dispatch(setGroup(1))
          }}
        >
          Pre-Intermediate(A2)
        </Button>
        <Button
          onClick={() => {
            dispatch(setGroup(2))
          }}
        >
          Intermediate(B1)
        </Button>
        <Button
          onClick={() => {
            dispatch(setGroup(3))
          }}
        >
          Upper-Intermediate(B2)
        </Button>
        <Button
          onClick={() => {
            dispatch(setGroup(4))
          }}
        >
          Advanced(C1)
        </Button>
        <Button
          onClick={() => {
            dispatch(setGroup(5))
          }}
        >
          Mastery(C2)
        </Button>
      </ButtonGroup>
      <div className='words-wrapper'>{arr && arr.map((word: IWord) => <Book key={word._id} word={word} />)}</div>
      <div className='pages'>
        {pages.map((el, index) => (
          <span
            key={index}
            className={page == el ? 'current-page' : 'page'}
            onClick={() => {
              dispatch(setPage(el))
            }}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  )
}
