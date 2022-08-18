import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import { Routes, Route } from 'react-router-dom'
import { Sprint } from './components/games/Sprint'
import { postAPI } from './services/PostService'

function App() {
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery(1)
  console.log(isLoading, words, error)
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/games' element={<Sprint />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
