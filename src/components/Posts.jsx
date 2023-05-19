import React from "react";
import {Link} from "react-router-dom";

function Posts(){

    return(
        <>
        <h1>Posts List</h1>
        <Link to="/Posts/1">Post 1 </Link>
        </>
    )
}

export default Posts;