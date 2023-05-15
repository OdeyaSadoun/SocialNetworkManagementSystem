import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Login/>
      </div>
      <p className="read-the-docs">
        Ori Ben Ezra and Nov Segal
      </p>
    </>
  )
}

export default App
