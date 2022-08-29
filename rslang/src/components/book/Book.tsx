import React, { FC } from 'react'
import { IWord, IWordState } from '../../models/IWord'
import { postAPI } from '../../services/PostService'
import { Howl, Howler } from 'howler'
import '../../style/words.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as Sound } from '../../assets/iconmonstr-sound-thin.svg' 


interface ElItemProps {
  el: IWord;
}

export const Book = ({el}: ElItemProps) => {
  const soundAudio = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.audio}`] 
  });
  const soundAudio1 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.audioMeaning}`] 
  });
  const soundAudio2 = new Howl({
    src: [`https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.audioExample}`] 
  });
  return (
    // <div className='words-wrapper'>[ `https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.audioExample}`]
    //     <div className='words'>
    //       <div style={{display: 'flex'}}>
    //         <div onClick={() => {soundAudio.play()}}>{el.audio}</div>
    //         <div>{el.word}</div>
    //       </div>
    //       <div>{el.transcription}</div>
    //       <div>{el.audioExample}</div>
    //       <div>{el.audioMeaning}</div>
    //       <img src={`https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.image}`} className='words__img'></img>
    //       <div>{el.textMeaning}</div>
    //     </div>
    //     <Item />
    // </div>
    <div>
      <Card sx={{ height: '400px'}}>
        <CardMedia
          component="img"
          height="140"
          image={`https://rs-lang-back-diffickmenlogo.herokuapp.com/${el.image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {el.word}/ {el.transcription} / {el.group} / {el.page}
            <Sound onClick={() => {soundAudio.play(); setTimeout(() => soundAudio1.play(), 800); setTimeout(() => soundAudio2.play(), 6000) }} className='sound-icon'/>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="rgb(136, 136, 136)">
            {el.wordTranslate}
          </Typography>
          <Typography variant="h5" color="black">
            {el.textMeaning}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {el.textMeaningTranslate}
          </Typography>
          <br />
          <Typography variant="h5" color="black">
            {el.textExample}
          </Typography>
          <Typography variant="h5" color="rgb(136, 136, 136)">
            {el.textExampleTranslate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};
