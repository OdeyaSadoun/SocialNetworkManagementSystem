import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RestAPI from "../server/RestAPI";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State variable for email validation error
  const [registrationError, setRegistrationError] = useState(""); // State variable for registration error

  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(""); // Clear the email error message if email is valid
    }

    // Send registration data to the server
    const response = await RestAPI.createUser(
      name,
      username,
      email,
      phone,
      website,
      password
    );

    if (response && response.status === 201) {
      // Registration successful, navigate to the login page
      navigate("/login");
    } else {
      // Registration failed, set the registration error message
      setRegistrationError(
        "Fill in reqired fields/ don't repeate existing accounts"
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="name"> Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">*Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">*Email:</label>
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
        <label htmlFor="password">*Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {emailError && <span className="error-message">{emailError}</span>}
        {registrationError && (
          <span className="error-message">{registrationError}</span>
        )}
      </div>
      <button onClick={handleRegister}>Register</button>

      {/* Add the "Back to Login" button using Link */}
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default Register;
