import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IWord } from '../../models/IWord'
import { createSound } from './Sprint'
import WinSound from '../../assets/sound/win.mp3'
import LoseSound from '../../assets/sound/lose.mp3'
import { Howler } from 'howler'
import { postStats } from '../../store/reducers/ActionCreaters'
import { Table, TableCell, TableHead, TableRow, TableBody, Box, TableContainer, Paper, Button } from '@mui/material'
import { GameResultRow } from './GameResultRow'
import { Link } from 'react-router-dom'

interface IGameStats {
  allSeries: number[]
  failAnswers: IWord[]
  correctAnswers: IWord[]
  gameName: string
  lifes?: number
}

function getMaxOfArray(numArray: number[]) {
  return Math.max.apply(null, numArray)
}

export const GameResult = ({ allSeries, correctAnswers, failAnswers, lifes, gameName }: IGameStats) => {
  const { soundVolume } = useAppSelector((state) => state.levelSlice.settings)
  const { token } = useAppSelector((state) => state.levelSlice.userData)
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState<string>('')
  const [addStats, setAddStats] = useState<boolean>(false)

  const audioWin = useMemo(() => createSound(WinSound, soundVolume), [soundVolume])
  const audioDefeat = useMemo(() => createSound(LoseSound, soundVolume), [soundVolume])

  const sendUserStats = useCallback(async () => {
    if (!token) {
      return alert('Статистика не была обновлена, авторизуйтесь')
    }
    if (!correctAnswers.length && !failAnswers.length) return
    await dispatch(postStats({ token, gameName, correctAnswers, failAnswers, allSeries }))
  }, [allSeries, correctAnswers, dispatch, failAnswers, gameName, token])

  useEffect(() => {
    Howler.stop()
    sendUserStats()
    if ((lifes as number) <= 0 || !correctAnswers.length || failAnswers.length > 5) {
      audioDefeat.play()
      setTitle('В этот раз не получилось. Продолжай тренироваться')
    } else {
      audioWin.play()
      setTitle('Отличная работа! Не сбавляй обороты')
    }
  }, [audioDefeat, audioWin, correctAnswers.length, failAnswers.length, lifes, sendUserStats])

  useEffect(() => {
    return () => {
      Howler.stop()
    }
  }, [audioWin, audioDefeat])

  return (
    <div>
      <h1 style={{ fontSize: '3rem' }}>{title}</h1>
      <h2 style={{ fontSize: '3rem' }}>{`Максимальная длинна серии: ${getMaxOfArray(allSeries)}`}</h2>
      <TableContainer component={Paper} sx={{ maxHeight: 335, margin: '20px auto' }}>
        <Table sx={{ minWidth: 320 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgb(17, 169, 17)', fontSize: '2.2rem' }}>{`Правильно: ${correctAnswers.length}`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {correctAnswers.map((correctAnswer) => (
              <GameResultRow key={correctAnswer.word} answer={correctAnswer} backgroundColor='rgb(17, 169, 17)' />
            ))}
            <TableRow>
              <TableCell sx={{ color: 'rgb(241, 52, 52)', fontSize: '2.2rem' }}>{`Не правильно: ${failAnswers.length}`}</TableCell>
            </TableRow>
            {failAnswers.map((failAnswer) => (
              <GameResultRow key={failAnswer.word} answer={failAnswer} backgroundColor='rgb(241, 52, 52)' />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px' }}>
        <Button
          sx={{
            width: 110,
            height: 45,
            backgroundColor: '#9b6ad6',
            fontSize: 15,
            transform: 'scale(1)',
            color: '#fff',
            transition: 'all 0.5s ease 0s',
            padding: 0,
            '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s', background: 'rgba(233, 214, 255, 0.8235294118)' },
            '& a': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              color: '#fff',
              '&:hover': {
                color: '#9b6ad6',
              },
            },
          }}
        >
          <Link to='/games/'>Выбор игры</Link>
        </Button>
        {/* <Button
          sx={{
            width: 110,
            height: 45,
            backgroundColor: '#9b6ad6',
            fontSize: 15,
            transform: 'scale(1)',
            color: '#fff',
            transition: 'all 0.5s ease 0s',
            '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s', backgroundColor: 'rgb(17, 169, 17)' },
          }}
        >
          Ещё раз
        </Button> */}
      </Box>
    </div>
  )
}
