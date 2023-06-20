import React, { useState, useEffect, useContext, useRef } from "react";
import { userContext } from "../App";
import "./Posts.css";
import { Link } from "react-router-dom";
import RestAPI from "../server/RestAPI";

function Posts() {
  const { id: userId } = useContext(userContext);
  ///const username = useContext(userContext).username;
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const postContentRef = useRef([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await RestAPI.getPostsByUsername(user.username);
        // const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [user.id]);

  const handlePostClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  useEffect(() => {
    const selectedPostIndex = posts.findIndex(
      (post) => post.id === selectedPostId
    );
    if (selectedPostIndex !== -1 && postContentRef.current[selectedPostIndex]) {
      const postContentElement = postContentRef.current[selectedPostIndex];
      postContentElement.style.maxHeight = selectedPostId
        ? `${postContentElement.scrollHeight}px`
        : "0";
    }
  }, [selectedPostId, posts]);

  return (
    <>
      <h1>Posts List</h1>
      <div className="PostList">
        {posts.map((post, index) => (
          <div key={post.id}>
            <h3 onClick={() => handlePostClick(post.id)}>{post.title}</h3>
            <div
              ref={(el) => (postContentRef.current[index] = el)}
              className={`post-content ${
                selectedPostId === post.id ? "active" : ""
              }`}
            >
              <p>{post.body}</p>
              <Link to={`/${user.id}/Posts/${post.id}/Comments`}>Comments</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;
