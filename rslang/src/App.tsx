import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Sprint } from './components/games/Sprint'
import { postAPI } from './services/PostService'
import { BookContainer } from './components/book/BookContainer'
import { SignIn } from './components/sign/SignIn'
import { SignUp } from './components/sign/SignUp'
import { Profile } from './components/profile/Profile'
import { About } from './components/about/About'

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/games' element={<Sprint />} />
        <Route path='/book' element={<BookContainer />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
