import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Games from './components/games/Games'
// import { postAPI } from './services/PostService'
import { Sprint } from './components/games/Sprint'
import { AudioChallenge } from './components/games/AudioChallenge'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { postAPI } from './services/PostService'
import { BookContainer } from './components/book/BookContainer'
import { SignIn } from './components/sign/SignIn'
import { SignUp } from './components/sign/SignUp'
import { Profile } from './components/profile/Profile'


function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/sprint' element={<Sprint />} />
        <Route path='/games/audio_chalenge' element={<AudioChallenge />} />
        <Route path='/book' element={<BookContainer />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
