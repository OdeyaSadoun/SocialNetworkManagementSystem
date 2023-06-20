import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import RestAPI from "../server/RestAPI"



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password)
    const user = await RestAPI.getUserByUsernameAndPassword(username, password);
    console.log(user)
    // // Password needs to be the last 4 digits of the lat field
    // const user = users.find((user) => user.username === username && user === password);

    if (user) {
      // Save the authorized user to local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the application page
      navigate(`/${user.id}`);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleNotHaveAccount = () => {
    navigate('/register');
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
        <button onClick={handleNotHaveAccount}>not have account?</button>
        {/* {errorMessage && <p>{errorMessage}</p>} */}
      </div>
    );
};

export default Login;
