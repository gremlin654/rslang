import '../../style/Games.scss'
import SprintImg from '../../assets/sprint.jpg'
import AudioChalengeImg from '../../assets/audioChalenge.jpg'
import Box from '@mui/material/Box/Box'
import LevelButton from './LevelButton/LevelButton'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setLevelAndPage } from '../../store/reducers/ActionCreaters'

const levels = [1, 2, 3, 4, 5, 6]

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

const Games = () => {
  const dispatch = useAppDispatch()
  const { level } = useAppSelector((state) => state.levelSlice)

  return (
    <>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
        {levels.map((item, index) => (
          <LevelButton key={item} item={item} index={index} level={level} />
        ))}
      </Box>
      <div className='games__container'>
        <div className='game__container'>
          <img className='game__img' src={SprintImg} alt='sprint' />
          <div className='game__text-container'>
            <h3 className='game__title'>Спринт</h3>
            <p className='game__text'>Проверьте себя, сколько очков вы cможете получить за одну минуту, отвечая , что правильно, а что нет.</p>
          </div>
          <button className='game__btn btn' disabled={level === null}>
            {level === null ? (
              'Играть'
            ) : (
              <Link to='/games/sprint' onClick={() => dispatch(setLevelAndPage({ group: level, page: getRandomNumber(0, 30) }))}>
                Играть
              </Link>
            )}
          </button>
        </div>

        <div className='game__container'>
          <img className='game__img' src={AudioChalengeImg} alt='audio-chalenge' />
          <div className='game__text-container'>
            <h3 className='game__title'>Аудиовызов </h3>
            <p className='game__text'>Проверьте свои навыки слушания, выбирая правильное значение после услышанного слова.</p>
          </div>
          <button className='game__btn btn' disabled={level === null}>
            {level === null ? (
              'Играть'
            ) : (
              <Link to='/games/audio_chalenge' onClick={() => dispatch(setLevelAndPage({ group: level, page: getRandomNumber(0, 30) }))}>
                Играть
              </Link>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Games
