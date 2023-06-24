
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestAPI from '../server/RestAPI';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log('hi handler register');
    // Send registration data to the server
    const response = await RestAPI.createUser(
      name,
      username,
      email,
      phone,
      website,
      password
    );
    console.log('hi register after options');
    console.log('response', response);
    if (response && response.status === 201) {
      // Registration successful, navigate to the desired component
      navigate('/Login');
      console.log('move to navigate');
    } else {
      // Registration failed, display an error message or handle as desired
      console.log('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
