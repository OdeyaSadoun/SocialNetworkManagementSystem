import React, { useState } from 'react';
import './Login.css';
function Login () {
  //const [userName, setUserName] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const username = document.getElementById('user-name').value;
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('pwd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist =
      formData.length &&
      JSON.parse(localStorage.getItem('formData')).some(
        (data) =>
          data.username.toLowerCase() === username.toLowerCase() &&
          data.pwd === pwd
      );

    if (!exist) {
      formData.push({
        username,
        email,
        pwd,
        scoreX: 0,
        scoreO: 0,
        scoreDraw: 0,
        scoreScaling: 0,
      });
      localStorage.setItem('formData', JSON.stringify(formData));
      document.querySelector('form').reset();
      document.getElementById('user-name').focus();
      alert('Account Created.\n\nPlease Sign In.');
    } else {
      alert('Ooopppssss... Duplicate found!!!\nYou have already signed up');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const username = document.getElementById('userName').value;
    const pwd = document.getElementById('pswd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist =
      formData.length &&
      JSON.parse(localStorage.getItem('formData')).some(
        (data) =>
          data.username.toLowerCase() === username.toLowerCase() &&
          data.pwd === pwd
      );

    if (!exist) {
      alert('Invalid Username or Password');
      handleIncorrectLogin(username);
    } else {
      let d = new Date();
      d.setTime(d.getTime() + 10 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = 'currentUser=' + username + ';' + expires + ';path=/';
      localStorage.setItem('currentUser', JSON.stringify(username));
      // Redirect to the home page
      window.location.href = '../html/homePage.html';
    }
  };

  const handleIncorrectLogin = (username) => {
    let incorrectLogin = JSON.parse(localStorage.getItem('incorrectLogin')) || [];
    let exist =
      incorrectLogin.length &&
      JSON.parse(localStorage.getItem('incorrectLogin')).some(
        (data) => data.username.toLowerCase() === username.toLowerCase()
      );

    if (!exist) {
      incorrectLogin.push({ username, count: 1 });
      localStorage.setItem('incorrectLogin', JSON.stringify(incorrectLogin));
    } else {
      let index = incorrectLogin.findIndex(
        (data) => data.username.toLowerCase() === username.toLowerCase()
      );
      incorrectLogin[index].count += 1;
      localStorage.setItem('incorrectLogin', JSON.stringify(incorrectLogin));
    }

    let index = incorrectLogin.findIndex(
      (data) => data.username.toLowerCase() === username.toLowerCase()
    );
    if (incorrectLogin[index].count >= 3) {
      let time = 3;
      let interval = setInterval(() => {
        document.getElementById('userName').disabled = true;
        document.getElementById('pswd').disabled = true;
        document.getElementById('signInBtn').disabled = true;
        document.getElementById('signInBtn').style.backgroundColor = 'rgba(256, 256, 256, 0.5)';
        document.getElementById('signInBtn').innerText = `Please wait ${time} seconds`;
        document.getElementById('signInBtn').style.color = '#f4157e';
        time--;
        if (time < 0) {
          document.getElementById('userName').disabled = false;
          document.getElementById('pswd').disabled = false;
          document.getElementById('signInBtn').disabled = false;
          document.getElementById('signInBtn').style.backgroundColor = '#f4157e';
          document.getElementById('signInBtn').innerText = `Sign In`;
          document.getElementById('signInBtn').style.color = '#fff';
          clearInterval(interval);
        }
      }, 1000);
    }
  };
  const handleSignUpLinkClick = () => {
    document.querySelector('.wrapper').classList.toggle('active');
  };

  const handleSignInLinkClick = () => {
    document.querySelector('.wrapper').classList.toggle('active');
  };

  return (
    <div className="wrapper">
      <div id="sign-in" className="form-wrapper sign-in">
        <form action="" role="form" onSubmit={handleSignIn} autoComplete="off">
          <h2>כניסה</h2>
          <div className="input-group">
            <input type="text" id="userName" required />
            <label htmlFor="">שם משתמש</label>
          </div>
          <div className="input-group">
            <input type="password" id="pswd" required />
            <label htmlFor="">סיסמא</label>
          </div>
          <div className="remember">
            <label>
              <input type="checkbox" /> זכור משתמש
            </label>
          </div>
          <button id="signInBtn" type="submit">
            כניסה
          </button>
          <div className="signUp-link">
            <p>
              עדיין אין לך חשבון?{' '}
              <a href="#" className="signUpBtn-link" onClick={handleSignUpLinkClick}>
                הרשמה
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-wrapper sign-up">
        <form action="" role="form" onSubmit={handleSignUp} id="signUpForm">
          <h2>הרשמה</h2>
          <div className="input-group">
            <input type="text" id="user-name" required />
            <label htmlFor="">שם משתמש</label>
          </div>
          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="">אמייל</label>
          </div>
          <div className="input-group">
            <input type="password" id="pwd" required />
            <label htmlFor="">סיסמא</label>
          </div>
          <button type="submit">הירשם</button>
          <div className="signUp-link">
            <p>
              יש לך כבר חשבון?{' '}
              <a href="#" className="signInBtn-link" onClick={handleSignInLinkClick}>
                כניסה
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;