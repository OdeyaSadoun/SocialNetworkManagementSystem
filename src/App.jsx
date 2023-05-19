import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Albums from './components/Albums';
import Album from './components/Album';
import NotFound from './components/NotFound';
import { useLocation } from 'react-router-dom';

import "./styles.css"





function App() {



// console.log(fetch('https://jsonplaceholder.typicode.com/'));


  return (
  <Router>
    <>
    <nav>
      <ul>
        <li>
          <NavLink to="/" >HomePage</NavLink> 
        </li>
        <li>  
          <NavLink to="/Login" >Login</NavLink> 
        </li> 
        <li>  
          <NavLink to="/Albums">Albums</NavLink> 
        </li> 
        <li>  
          <NavLink to="/Album">Album</NavLink> 
        </li> 
        
      </ul>
    </nav>
    
      <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Albums" element={<Albums />} />
          <Route path="/Albums/:id" element={<Album />} /> 
          <Route path="*" element={<NotFound />} />
      
         <Route path="/login" element={<Login />} />
      </Routes>
   
    </> 
  </Router>
  )
}

export default App