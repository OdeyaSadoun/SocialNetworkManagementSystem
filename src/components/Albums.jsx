import React from 'react';
import {Link} from "react-router-dom"
function Albums () {
  // Your component code here
  return (
    <>
    <h1>Albums List</h1>
    <Link to="/Albums/1">Album 1 </Link>
    <br/>
    <Link to="/Albums/2">Album 2 </Link>
    </>
  )
};

export default Albums;