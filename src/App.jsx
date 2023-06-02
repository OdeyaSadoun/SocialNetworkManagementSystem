import Login from './components/Login';
import { useState, Component } from 'react';
import "./styles.css"
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Albums from './components/Albums';
import { useLocation } from 'react-router-dom';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Info from './components/Info';

function App() {

// console.log(fetch('https://jsonplaceholder.typicode.com/'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <div>
      
            <Login onLogin={handleLogin} />
          {/* Define other routes here */}
        {isLoggedIn ? (
          <div>
            <h2>Welcome, User!</h2>
            <Login onLogout={handleLogout} />
            <h2>Please login</h2>
            {/* <Link to="/login">Login</Link> */}
            <Routes>
              <Route path="/HomePage"  />
              <Route path="/Albums" element={<Albums />} />
              <Route path="/Albums/:id" element={<Albums />} />
              <Route path="/Todos" element={<Todos />} />
              <Route path="/Posts" element={<Posts />} />
              <Route path="/Info" element={<Info userId={userId}/>} />
            </Routes>
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;