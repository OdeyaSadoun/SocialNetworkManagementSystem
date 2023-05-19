import React from "react";
import { Link, Route, Routes ,Outlet} from "react-router-dom";
import Navbar from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";
import Posts from "./Posts";
import Logout from "./Logout";
import Albums from "./Albums";
import Todos from "./Todos";
import Info from "./Info";
// import Comments from "./Comments";/

function HomePage(){

    const [data, setData] = useState('');

    async function postsClick(){
    
        let data_list = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data_list_json = data_list.json();
        setData(data_list_json);
        console.log("data_list_json:  ", data_list_json);
        console.log("data:  ", data);
    }

    useEffect(() => {
        postsClick()
    }, [])



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
        <Routes>
            {/* <Route path="/comments" element={<Comments />}/> */}
            <Route path="/albums" element={<Albums />}/>            
            <Route path="/posts" element={<Posts />}/>
            <Route path="/posts/:id" element={<Posts />} /> 
            <Route path="/todos" element={<Todos />}/>
            {/* <Route path="/users" element={<Users />}/> */}
            <Route path="/todos" element={<Todos />}/>
        </Routes>


            {/* Links */}
            <br/><Link to="/Logout">Logout</Link>
            <br/><Link to="/Albums">Albums</Link>            
            <br/><Link to="/Posts" onClick={() =>postsClick()}>Posts</Link>
            <br/><Link to="/Todos">Todos</Link>
            <br/><Link to="/Info">Info</Link>


        </>
    )
};

export default HomePage;

