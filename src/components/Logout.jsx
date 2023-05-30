import React from 'react';

const Logout = ({ userName, onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions here
    // For example, clearing user session or token

    // Call the onLogout callback to notify the parent component
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  if (userName) {
    return (
      <div>
        <h2>Welcome, {userName}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  else{  
    return <button onClick={handleLogout}>Login</button>;
  }
};

export default Logout;
