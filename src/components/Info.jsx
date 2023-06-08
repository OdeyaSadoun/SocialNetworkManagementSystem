import React, { useState, useEffect } from 'react';
import { userContext } from "../App";
import { useContext } from "react";

const Info = () => {
  const user = useContext(userContext);

  return (
    <div>
      <h1>User Info</h1>
      <p>User Name: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address?.street}, {user.address?.city}</p>
    </div>
  );
};

export default Info;
