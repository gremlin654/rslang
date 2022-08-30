import React from 'react'
import { IWord, IWordState } from '../../models/IWord'
import { postAPI } from '../../services/PostService'
import { Book } from './Book'
import '../../style/words.scss'
import { Button, ButtonGroup, Pagination, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/redux'
import { wordSlice } from '../../store/reducers/WordSlice'
import { useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'

export const BookContainer = () => {
  const dispatch = useDispatch()
  const page = useAppSelector((state) => state.wordSlice.page) as number
  const group = useAppSelector((state) => state.wordSlice.group) as number
  const totalCount = useAppSelector((state) => state.wordSlice.totalCount) as number
  const perPage = useAppSelector((state) => state.wordSlice.perPage) as number
  const pagesCount = Math.ceil(totalCount / perPage)
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  //  function createPages(pages: number[], pagesCount: number, currentPage: number) {
  //   if(pagesCount > 10) {
  //       if(currentPage > 5) {
  //           for (let i = currentPage-4; i <= currentPage+5; i++) {
  //               pages.push(i)
  //               if(i == pagesCount) break
  //           }
  //       }
  //       else {
  //           for (let i = 1; i <= 10; i++) {
  //               pages.push(i)
  //               if(i == pagesCount) break
  //           }
  //       }
  //   }  else {
  //       for (let i = 1; i <= pagesCount; i++) {
  //           pages.push(i)
  //       }
  //   }
  // }
  // createPages(pages, pagesCount, page);
  const setPage = wordSlice.actions.setPage
  const setGroup = wordSlice.actions.setGroup
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery({ page, group })
  console.log(words)
  return (
    <div>
      <div>Избранные слова</div>
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
      <div className='words-wrapper'>{words && words.map((el: IWord) => <Book key={el._id} el={el} />)}</div>
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
