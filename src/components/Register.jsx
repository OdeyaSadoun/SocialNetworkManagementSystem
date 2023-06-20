import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestAPI from '../server/RestAPI';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Send registration data to the server
    const response = await RestAPI.createUser(
      username,
      password,
      email,
      website,
      name,
      phone
    );

    if (response) {
      // Registration successful, navigate to the desired component
      navigate(`/link-component`);
    } else {
      // Registration failed, display an error message or handle as desired
      console.log('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      {/* Add other registration input fields as needed */}
      {/* ... */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
