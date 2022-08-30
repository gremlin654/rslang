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
import { wordSliceUser } from '../../store/reducers/UserWords'
import { Difficult } from './Difficult'
import { Link } from 'react-router-dom'
import { IFullUser } from '../../models/IUser'
 
export const BookContainer = () => {
  const dispatch = useDispatch();
   const page = useAppSelector((state) => state.wordSlice.page) as number;
   const group = useAppSelector((state) => state.wordSlice.group) as number;
   const pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  
  const setUserWords = wordSliceUser.actions.getUserWords;
  const setPage = wordSlice.actions.setPage;
  const setGroup = wordSlice.actions.setGroup;
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery({page, group})
  const user = useAppSelector((state ) => state.userSlice) as IFullUser;
  console.log(user.userWords)
  return (
    <div className='wrapper'>
      <div className='btn-difficult'>
        <Link to='/book/difficult'>Сложные слова</Link>
      </div>
      <div>
        <Link to='/book/level'>Level A1</Link>
      </div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => {dispatch(setGroup(0))}}>Beginner(A1)</Button>
          <Button onClick={() => {dispatch(setGroup(1))}}>Pre-Intermediate(A2)</Button>
          <Button onClick={() => {dispatch(setGroup(2))}}>Intermediate(B1)</Button>
          <Button onClick={() => {dispatch(setGroup(3))}}>Upper-Intermediate(B2)</Button>
          <Button onClick={() => {dispatch(setGroup(4))}}>Advanced(C1)</Button>
          <Button onClick={() => {dispatch(setGroup(5))}}>Mastery(C2)</Button>
        </ButtonGroup>
        <div className='words-wrapper'>
            {words && words.map((word: IWord) => 
                <Book key={word._id} word={word}/>
            )}
        </div>
        <div className='pages'>
          {pages.map((el, index) => <span key={index} className={page == el ? 'current-page' : 'page'} onClick={() => {dispatch(setPage(el))}}>{el}</span> )}
      </div>
    </div>
  )
}
