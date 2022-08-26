import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { IWord } from '../../models/IWord'
import { levelSlice } from '../../store/reducers/WordGroupSlice'
import FailSound from '../../assets/sound/fail.mp3'
import SuccessSound from '../../assets/sound/success.mp3'
import { createSound } from './Sprint'

const initialObject = {} as IWord

export const AudioChallenge = () => {
  const { soundVolume, wordVolume } = useAppSelector((state) => state.levelSlice.settings)
  const { words, isLoading } = useAppSelector((state) => state.levelSlice)
  const { setLevel, setActiveWords } = levelSlice.actions
  const dispatch = useAppDispatch()

  const [endGame, setEndGame] = useState(false)
  const [wordsArray, setWordsArray] = useState<IWord[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<IWord[]>([])
  const [failAnswers, setFailAnswers] = useState<IWord[]>([])
  const [currentWord, setCurrentWord] = useState(initialObject)
  const [currentRussianWord, setCurrentRussianWord] = useState<string>('')
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [currentSeries, setCurrentSeries] = useState<number>(0)
  const [allSeries, setAllSeries] = useState<number[]>([])
  const [lifes, setLifes] = useState<number>(5)

  const gameBoard = useRef() as MutableRefObject<HTMLDivElement>
  const seriesContainer = useRef() as MutableRefObject<HTMLDivElement>

  const audioSuccess = useMemo(() => createSound(SuccessSound, soundVolume), [soundVolume])
  const audioFail = useMemo(() => createSound(FailSound, soundVolume), [soundVolume])
  const audioWord = useMemo(
    () => createSound(`https://rs-lang-back-diffickmenlogo.herokuapp.com/${currentWord.audio}`, wordVolume),
    [wordVolume, currentWord],
  )
  const playWords = useCallback(() => {
    setWordsArray(words)
  }, [words])

  useEffect(() => {
    playWords()
  }, [playWords])

  return <div>AudioCall</div>
}
