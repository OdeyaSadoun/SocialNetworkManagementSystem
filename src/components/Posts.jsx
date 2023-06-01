import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

function Posts({userId}){

    const [data, setData] = useState('');
    const [posts, setPosts] = useState([]);
    // let userId = ;
    let list = [];
    useEffect(() => {
        
        async function postsClick(){
        
            let posts = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                                    .then((response) => response.json());
            console.log(posts);
            setPosts(posts);
            
            

            // if(response.ok==false)
            // {
            //     throw new Error("Error!");
            // }
        }

            
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