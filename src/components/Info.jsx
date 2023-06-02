import React, { useState, useEffect } from 'react';

const Info = ({userId}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?userId=${userId}`);
        const userData = await response.json();
        setUser(userData);
      } 
      
        catch (error) {
        console.error('Error fetching user:', error);
        setUser({});
      }
    };
    
    userInfo();
  }, [userId]);


  return (
    <div>
      <h1>User Info</h1>
      <p>User Name: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* <p>Address: {user.address.street}, {user.address.city}</p> */}
      {user.address && (
        <div>
          <h2>Address</h2>
          <p>Street: {user.address.street}</p>
          <p>City: {user.address.city}</p>
          <p>Zipcode: {user.address.zipcode}</p>
        </div>
      )}
    </div>
  );
};

export default Info;
