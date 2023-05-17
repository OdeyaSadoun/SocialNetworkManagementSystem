import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login';
import HomePage from './components/HomePage';
import {Link, Route, Routes} from 'react-router-dom'


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/login" element= {<Login/>}/>
      </Routes>
    </>   
  )
}

export default App
