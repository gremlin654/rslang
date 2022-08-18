import '../../style/Games.scss'
import SprintImg from '../../assets/sprint.jpg'
import AudioChalengeImg from '../../assets/audioChalenge.jpg'
import { Link } from 'react-router-dom'

const Games = () => {
  return (
    <div className='games__container'>
      <div className='game__container'>
        <img className='game__img' src={SprintImg} alt='sprint' />
        <div className='game__text-container'>
          <h3 className='game__title'>Спринт</h3>
          <p className='game__text'>Проверьте себя, сколько очков вы cможете получить за одну минуту, отвечая , что правильно, а что нет.</p>
        </div>
        <button className='game__btn btn'>
          <Link to='/games/sprint'>Играть</Link>
        </button>
      </div>

      <div className='game__container'>
        <img className='game__img' src={AudioChalengeImg} alt='audio-chalenge' />
        <div className='game__text-container'>
          <h3 className='game__title'>Аудиовызов </h3>
          <p className='game__text'>Проверьте свои навыки слушания, выбирая правильное значение после услышанного слова.</p>
        </div>
        <button className='game__btn btn'>
          <Link to='/games/audio_chalenge'>Играть</Link>
        </button>
      </div>
    </div>
  )
}

export default Games
