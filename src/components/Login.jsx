import React, { useState } from 'react';
import './Login.css';
import { useEffect } from 'react';
import { Navigate, useNavigate, Routes, NavLink } from "react-router-dom";
import HomePage from './HomePage';
import Albums from './Albums';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Todos';
import Posts from './Posts';
import Info from './Info';
import Logout from './Logout';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      const foundUser = users.find(user => user.username === username);

      if (foundUser) {
        const lastFourDigits = foundUser.address.geo.lat.slice(-4);
        if (password === lastFourDigits) {
          // Authorized user, perform login actions here
          console.log('User logged in successfully!');
          setIsLoggedIn(true);
          // localStorage.setItem("username", JSON.stringify(username));
          localStorage.setItem('currentUser', JSON.stringify(username));
        } else {
          setErrorMessage('Invalid password');
        }
      } else {
        setErrorMessage('User not found');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  if (isLogin) {
    return (
      <HomePage userName={username}/>
    );
  } else {
    return (
      <>
        <div>
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button onClick={handleLogin}> Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </>
    );
  }
};

export default Login;
