import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';


function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
      const users = await response.json();
      const foundUser = users.find(user => user.username === username);

      if (foundUser) {
        const lastFourDigits = foundUser.address.geo.lat.slice(-4);
        if (password === lastFourDigits) {
          // Authorized user, perform login actions here
          console.log('User logged in successfully!');
          setIsLoggedIn(true);
          props.setUserInfo(users[0]);

          navigate(`/${users[0].id}`);

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
};

export default Login;
