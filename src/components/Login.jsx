import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import RestAPI from "../server/RestAPI";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login.js (Updated handleLogin function)
const handleLogin = async (e) => {
  e.preventDefault();
  console.log(username, password);

  try {
    const user = await RestAPI.getUserByUsernameAndPassword(username, password);
    console.log(user);

    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/${user.id}`);
  } catch (error) {
    alert(error.message || "Invalid username or password");
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
          onChange={(event) => setUsername(event.target.value)}
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
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
