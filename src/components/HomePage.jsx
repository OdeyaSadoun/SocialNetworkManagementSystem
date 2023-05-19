import React from "react";
// import App from "../App";
// import Login from "./Login";
import Navbar from "./NavBar";
import { Link, Route, Outlet } from "react-router-dom";

function HomePage(){

    // fetch('https://jsonplaceholder.typicode.com/comments/1')
    // .then((response) => response.json())
    // .then((data) => console.log(data))

    // fetch('https://jsonplaceholder.typicode.com/comments', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         name: 'Comment 105',
    //         email: 'dylansemail310@gmail.com',
    //         body: 'Dopes comment in the game',
    //         postId: 1
    //     })
    // })
    // .then((response) => response.json())
    // .then((data) => console.log(data))

    
    return ( 
        <>
          <Navbar></Navbar>  
          <section className="section">
            <Outlet/>
          </section>
        </>
        )
};

export default HomePage;

