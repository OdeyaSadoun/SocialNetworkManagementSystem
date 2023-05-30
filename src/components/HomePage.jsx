import React from "react";
import {NavLink ,Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Posts from "./Posts";
import Logout from "./Logout";
import Albums from "./Albums";
import Todos from "./Todos";
import Info from "./Info";

const HomePage = ({ userName }) => {
  return (
    <div>
      <h2>Welcome to the Homepage, {userName}!</h2>
      <div>
        <navbar className='navbar'>
          {/* <NavLink to="/HomePage">HomePage </NavLink> */}
          <NavLink to="/Logout">Logout </NavLink>
          <NavLink to="/Albums">Albums </NavLink>
          <NavLink to="/Todos">Todos </NavLink>
          <NavLink to="/Posts">Posts </NavLink>
          <NavLink to="/Info">Info </NavLink>
        </navbar>

        <Routes>
          {/* <Route path="/HomePage" element={<HomePage userName={username} />} /> */}
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Albums" element={<Albums />} />
          <Route path="/Albums/:id" element={<Albums />} />
          <Route path="/Todos" element={<Todos />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/Info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
