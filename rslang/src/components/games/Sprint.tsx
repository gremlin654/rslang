/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import '../../style/Sprint.scss'
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, LinearProgress, Paper, Typography, Box } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'
import FailSound from '../../assets/sound/fail.mp3'
import FonSound from '../../assets/sound/fon.mp3'
import SuccessSound from '../../assets/sound/success.mp3'
import { IWord } from '../../models/IWord'
import { getRandomNumber } from './Games'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import { RoundTimer } from './RoundTimer'
import { levelSlice } from '../../store/reducers/WordGroupSlice'
import { GameResult } from './GameResult'
import { Link } from 'react-router-dom'

export const createSound = (src: string, volume: number, rate = 1, loop = false) => new Howl({ src, volume: 0.01 * volume, rate, loop })

function toggleScreen(elem: HTMLDivElement) {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    elem.requestFullscreen()
  }
}

const keyCode = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
}

const initialObject = {} as IWord

export const Sprint = () => {
  const { soundVolume, musicVolume } = useAppSelector((state) => state.levelSlice.settings)
  const { words, isLoading } = useAppSelector((state) => state.levelSlice)
  const { setLevel, setActiveWords } = levelSlice.actions
  const dispatch = useAppDispatch()

  const [endGame, setEndGame] = useState<boolean>(false)
  const [seconds, setSeconds] = useState<number>(60)
  const [wordsArray, setWordsArray] = useState<IWord[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([])
  const [failAnswers, setFailAnswers] = useState<IWord[]>([])
  const [currentWord, setCurrentWord] = useState(initialObject)
  const [currentRussianWord, setCurrentRussianWord] = useState<string>('')
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [currentSeries, setCurrentSeries] = useState<number>(0)
  const [allSeries, setAllSeries] = useState<number[]>([])
  const gameBoard = useRef() as MutableRefObject<HTMLDivElement>
  const seriesContainer = useRef() as MutableRefObject<HTMLDivElement>
  const timer = useRef<string | number | undefined | ReturnType<typeof setInterval>>()

  const audioSuccess = useMemo(() => createSound(SuccessSound, soundVolume), [soundVolume])
  const audioFail = useMemo(() => createSound(FailSound, soundVolume), [soundVolume])
  const audioFon = useMemo(() => createSound(FonSound, musicVolume * 0.1, 1, true), [musicVolume])

  const playWords = useCallback(() => {
    setWordsArray(words)
  }, [words])

  useEffect(() => {
    playWords()
  }, [playWords])

  const answer = useCallback(
    (value: string) => {
      if (endGame) return
      if (
        (value === 'true' && currentWord.wordTranslate === currentRussianWord) ||
        (value === 'false' && currentWord.wordTranslate !== currentRussianWord)
      ) {
        seriesContainer.current.innerHTML += ' <img src="https://img.icons8.com/emoji/452/star-emoji.png"/>'
        setCurrentSeries((prev) => prev + 1)
        setCorrectAnswers((prev) => [...prev, currentWord])
        audioSuccess.play()
      } else {
        setAllSeries((prev) => [...prev, currentSeries])
        setCurrentSeries(0)
        seriesContainer.current.innerHTML = ''
        setFailAnswers((prev) => [...prev, currentWord])
        audioFail.play()
      }
      setCurrentNumber((prev) => prev + 1)
      console.log(correctAnswers)
      console.log(failAnswers)
    },
    [audioFail, audioSuccess, currentRussianWord, currentSeries, currentWord, endGame],
  )

  useEffect(() => {
    if (wordsArray.length && currentNumber < wordsArray.length) {
      setCurrentWord(wordsArray[currentNumber])
      setCurrentRussianWord(() => {
        let word
        const num = Math.random()
        if (num > 0.45) {
          word = wordsArray[currentNumber].wordTranslate
        } else {
          word = wordsArray[getRandomNumber(0, wordsArray.length)].wordTranslate
        }
        return word
      })
    }
  }, [currentNumber, wordsArray])

  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    if (seconds <= 0 || (currentNumber && currentNumber >= wordsArray.length)) {
      setEndGame(true)
      clearInterval(timer.current)
    }
  }, [seconds, audioFon, currentNumber, wordsArray.length])

  useEffect(() => {
    if (!endGame && musicVolume) {
      audioFon.play()
    }
    return () => {
      Howler.stop()
    }
  }, [endGame, audioFon, musicVolume])

  useEffect(() => {
    if (endGame) return
    const keyboardClick = (evt: KeyboardEvent) => {
      if (!Object.values(keyCode).includes(evt.code)) return
      let value = ''
      if (evt.code === 'ArrowRight') {
        value = 'true'
      } else if (evt.code === 'ArrowLeft') {
        value = 'false'
      }

      answer(value)
    }
    document.addEventListener('keydown', keyboardClick)
    return () => {
      document.removeEventListener('keydown', keyboardClick)
    }
  }, [answer, endGame])

  useEffect(() => {
    return () => {
      dispatch(setLevel(null))
      dispatch(setActiveWords([]))
    }
  }, [dispatch])

  function goFullScreen(elem: HTMLDivElement) {
    setFullScreen((prev) => !prev)
    toggleScreen(elem)
  }

  return (
    <div className='game-sprint__container'>
      {isLoading ? (
        <CircularProgress className='game-sprint__loader' />
      ) : endGame ? (
        <GameResult allSeries={allSeries} gameName='sprint' correctAnswers={correctAnswers} failAnswers={failAnswers} />
      ) : (
        <div ref={gameBoard} className='game-sprint__board'>
          <LinearProgress
            variant='determinate'
            value={(currentNumber / wordsArray.length) * 100}
            sx={{
              backgroundColor: '#fff',
              '& .MuiLinearProgress-bar': { backgroundColor: '#360570' },
              height: '1rem',
              borderRadius: '4px',
              width: '80%',
            }}
          />
          <h4 className='game-sprint__progress-text'>
            Правильные ответы:&#160;
            <span className='game-sprint__progress-correct'>{correctAnswers.length || 0}</span>
          </h4>
          <h4 className='game-sprint__progress-text'>
            Ошибки:&#160;
            <span className='game-sprint__progress-fail'>{failAnswers.length || 0}</span>
          </h4>
          <div ref={seriesContainer} className='game-sprint__series-container' />
          <Card
            sx={{
              width: 320,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: '0.2rem solid rgba(233, 214, 255, 0.8235294118)',
            }}
          >
            {fullScreen ? (
              <FullscreenExitIcon className='game-sprint__btn-fullscreen' onClick={() => goFullScreen(gameBoard.current)} />
            ) : (
              <FullscreenIcon className='game-sprint__btn-fullscreen' onClick={() => goFullScreen(gameBoard.current)} />
            )}
            <Link to='/games'>
              <ArrowBackIosNewIcon className='game-sprint__btn-back' />
            </Link>
            <RoundTimer seconds={seconds} />
            <CardContent sx={{ backgroundColor: 'rgba(233, 214, 255, 0.8235294118)', width: '90%' }}>
              <h4 className='game-sprint__word-en'>{currentWord.word || ''}</h4>
              <h4 className='game-sprint__word-rus'>{currentRussianWord || ''}</h4>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  width: 110,
                  height: 45,
                  backgroundColor: 'rgb(241, 52, 52)',
                  fontSize: 15,
                  transform: 'scale(1)',
                  color: '#fff',
                  transition: 'all 0.5s ease 0s',
                  '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s', backgroundColor: 'rgb(241, 52, 52)' },
                }}
                onClick={(event) => answer(event.currentTarget.value)}
                value={'false'}
              >
                НЕ ВЕРНО
              </Button>
              <Button
                sx={{
                  width: 110,
                  height: 45,
                  backgroundColor: 'rgb(17, 169, 17)',
                  fontSize: 15,
                  transform: 'scale(1)',
                  color: '#fff',
                  transition: 'all 0.5s ease 0s',
                  '&:hover': { transform: 'scale(1.1)', transition: 'all 0.5s ease 0s', backgroundColor: 'rgb(17, 169, 17)' },
                }}
                onClick={(event) => answer(event.currentTarget.value)}
                value={'true'}
              >
                ВЕРНО
              </Button>
            </CardActions>
            <Box sx={{ display: 'flex', fontSize: '2rem', gap: '9.4rem' }}>
              <p>←</p>
              <p>→</p>
            </Box>
          </Card>
        </div>
      )}
    </div>
  )
}
