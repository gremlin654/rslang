import React, { FC, useCallback, useEffect, useState } from 'react'
import { IWord } from '../../models/IWord'
import { Howl } from 'howler'
import '../../style/words.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as Sound } from '../../assets/iconmonstr-sound-thin.svg' 
import { IFullUser } from '../../models/IUser'
import { useAppSelector } from '../../hooks/redux'
import { ReactComponent as Star } from '../../assets/star.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/reducers/UserSlice';


interface ElItemProps {
  word: IWord;
}

export const Book = ({word}: ElItemProps) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state ) => state.userSlice) as IFullUser;
  const [difficult, setDifficult] = useState(false);
  const addWords = userSlice.actions.addUserWords;
  

  const soundAudio = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audio}`] 
  });
  const soundAudio1 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioMeaning}`] 
  });
  const soundAudio2 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.audioExample}`] 
  });

  const uploadWordsUser: any = useCallback(async (object: {wordId: string, name: string, value: string, wordName: string}, token: string) => {
    try{
        const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/updateWord', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(object),
        })
        const data = await res.json();
        dispatch(addWords(data.userWords))
    }catch(error){
        console.log(error);
    }
  }, []);

  const updateWord = async (event: React.MouseEvent<HTMLButtonElement>) => {
    
    event.stopPropagation()
    setDifficult(true);
    const body = {
        wordId: event.currentTarget.id,
        name: event.currentTarget.dataset.name,
        value: event.currentTarget.value,
        wordName: event.currentTarget.dataset.wordName,
        wordBody: word,
    }
    if (!user.token) {
        // return showMessage(
        //     'Для добавления / удаления слов необходимо авторизоваться',
        //     404
        // )
    }
    const { text, code } = await dispatch(uploadWordsUser(body, user.token))
    // showMessage(text, code)
}
  return (
    <div>
      <Card sx={{ height: '500px'}}>
        <CardMedia
          component="img"
          height="140"
          image={`https://rs-lang-back-diffickmenlogo.herokuapp.com/${word.image}`}
          alt="green iguana"
        />
        <div>
            Правильно: {word.correct}
          </div>
          <div>
            Ошибок: {word.fail}
          </div>
        <CardActions>
          {difficult ?  <button onClick={updateWord} data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Star width='40px' height='40px' ></Star>
          </button> 
              : 
            <button onClick={updateWord} data-name="difficult"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Star width='40px' height='40px' ></Star>
          </button>}
          <button onClick={updateWord} data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={`${difficult}`}>
            <Delete width='40px' height='40px'></Delete>
          </button>
        </CardActions>
        <div></div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {word.word}/ {word.transcription} / {word.group} / {word.page}
            <Sound onClick={() => {soundAudio.play(); setTimeout(() => soundAudio1.play(), 800); setTimeout(() => soundAudio2.play(), 6000) }} className='sound-icon'/>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="rgb(136, 136, 136)">
            {word.wordTranslate}
          </Typography>
          <Typography variant="h5" color="black">
            {word.textMeaning}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {word.textMeaningTranslate}
          </Typography>
          <br />
          <Typography variant="h5" color="black">
            {word.textExample}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {word.textExampleTranslate}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
