import React, { useState, Component } from 'react';
import "./Login.css"
import HomePage from './HomePage';
import Todos from './Todos';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          setName(users[0].name);
          setUserId(users[0].id);
          localStorage.setItem("username", JSON.stringify(username));

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

  const handleLogout = () => {    
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setName("");
    setUserId(0);
    setErrorMessage("");
    navigate("./Login");

  };

  if (isLoggedIn) {
    return (
<div>
        <h2>Welcome, {username}!</h2>
        <HomePage userName={userId}/>
        <Todos userId={userId} />
        <button onClick={handleLogout}>Logout</button>
      </div>    );
  } else {
    return (
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
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
};

export default Login;
