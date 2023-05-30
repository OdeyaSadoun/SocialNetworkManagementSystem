import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

function Posts(){

    const [data, setData] = useState('');
    let userId = 1;
    let list = [];
    // const [list, setPosts] = useState([]);

    async function getId(){
        const username = JSON.parse(localStorage.getItem("username"));
        userId = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
                        .then((response) => response.json());
            console.log(userId);
    }

    async function postsClick(){
    
        let data_list = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`)
                                .then((response) => response.json());
        setData(data_list);
        console.log("data_list:  ", data_list);
        list = data_list;
        console.log("data:  ", data);
    }

    useEffect(() => {
        postsClick()
    }, [])



    return(
        <>
            <h1>Posts List</h1>
            <div className="PostList">
            {list.map((post) => (
                        <div key={post.id}>
                            <h3>title: {post.title}</h3>
                            <p>body: {post.body}</p>
                            <hr />
                        </div>
      ))}
            </div>
        </>
    )
}

export default Posts;