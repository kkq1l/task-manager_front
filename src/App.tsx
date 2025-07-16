import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from './pages/Error404'

function App() {

  return (
    <>
      <Header/>

      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>

      <Footer/>
    </>
  )
}

export default App
