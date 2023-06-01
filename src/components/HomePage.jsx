import {NavLink ,Route, Routes } from "react-router-dom";
import { React, Component, useState ,useEffect} from "react";
import Posts from "./Posts";
import Albums from "./Albums";
import Todos from "./Todos";
import Info from "./Info";
import "./HomePage.css"

const HomePage = ({ userId }) => {
  return (
    <div>
      <navbar className="navbar">
        {/* <NavLink to="/Logout">Logout </NavLink> */}
        <NavLink to="/Albums">Albums </NavLink>
        <NavLink to="/Todos">Todos </NavLink>
        <NavLink to="/Posts">Posts </NavLink>
        <NavLink to="/Info">Info </NavLink>
      </navbar>

      <Routes>
        {/* <Route path="/Logout" element={<Logout />} /> */}
        <Route path="/Albums" element={<Albums />} />
        <Route path="/Albums/:id" element={<Albums />} />
        <Route path="/Todos" element={<Todos />} />
        <Route path="/Posts" element={<Posts {...userId} />} />
        <Route path="/Info" element={<Info />} />
      </Routes>
    </div>
  );
};

export default HomePage;
