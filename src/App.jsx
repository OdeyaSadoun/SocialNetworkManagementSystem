import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Albums from './components/Albums';
import Album from './components/Album';
import NotFound from './components/NotFound';
function App() {
  return (
  <Router>
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">HomePage</Link> 
        </li>
        <li>  
          <Link to="/Login">Login</Link> 
        </li> 
        <li>  
          <Link to="/Albums">Albums</Link> 
        </li> 
        <li>  
          <Link to="/Album">Album</Link> 
        </li> 
        
      </ul>
    </nav>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Album" element={<Album />} />
        <Route path="/Albums" element={<Albums />} />
        <Route path="/Albums/:id" element={<Album />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
   
    </> 
  </Router>
  )
}

export default App