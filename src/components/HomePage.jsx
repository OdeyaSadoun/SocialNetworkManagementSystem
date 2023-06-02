import {NavLink ,Route, Routes } from "react-router-dom";
import { React, Component, useState ,useEffect} from "react";
import Posts from "./Posts";
import Albums from "./Albums";
import Todos from "./Todos";
import Info from "./Info";
import "./HomePage.css"
import Photos from "./Photos"

const HomePage = ({ username, userId }) => {
  return (
    <div>
      <nav className="navbar">
        <NavLink className={"NavLink"} to="/Albums">Albums  </NavLink>
        <NavLink className={"NavLink"} to="/Todos">Todos  </NavLink>
        <NavLink className={"NavLink"} to="/Posts">Posts  </NavLink>
        <NavLink className={"NavLink"} to={`/${userId}/info`}>Info  </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Albums" element={<Albums />} />
        {/* <Route path="/Albums/:id/photos" element={<Photos />} /> */}
        <Route path="/Todos" element={<Todos userId={userId}  />} />
        <Route path="/Posts" element={<Posts {...userId} />} />
        <Route path="/Info" element={<Info userId={userId}/>} />
        <Route path="/Albums/:id" element={<Photos />} />

      </Routes>
    </div>
  );
};

export default HomePage;