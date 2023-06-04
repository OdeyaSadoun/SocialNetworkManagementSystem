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
      <h2>Hello, {username}!</h2>
    </div>
  );
};

export default HomePage;