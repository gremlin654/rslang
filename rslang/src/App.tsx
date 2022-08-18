import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes, Route } from 'react-router-dom'
import Games from './components/games/Games'
import { postAPI } from './services/PostService'
import Sprint from './components/games/Sprint'
import AudioChallenge from './components/games/AudioChallenge'

function App() {
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery(1)
  console.log(isLoading, words, error)
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/sprint' element={<Sprint />} />
        <Route path='/games/audio_chalenge' element={<AudioChallenge />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
