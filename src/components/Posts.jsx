import React, { useState, useEffect, useContext, useRef } from "react";
import { userContext } from "../App";
import "./Posts.css";
import { Link } from "react-router-dom";
import RestAPI from "../server/RestAPI";

function Posts() {
  const { id: userId } = useContext(userContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCompleted, setNewPostCompleted] = useState(false);
  const postContentRef = useRef([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await RestAPI.getPostsByUsername(user.username);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [user.username]);

  // const addPost = async (title, completed) => {
  //   try {
  //     const newPost = await RestAPI.addPostByUsername(
  //       user.username,
  //       user.id,
  //       title,
  //       completed
  //     );
  //     setPosts((prevPosts) => [...prevPosts, newPost]);
  //     setShowPopup(false);
  //     setNewPostTitle("");
  //     setNewPostCompleted(false);
  //   } catch (error) {
  //     console.error("Error adding post:", error);
  //   }
  // };

  const refreshPosts = async () => {
    const tasks = await RestAPI.getPostsByUsername(user.username);
    setPosts(tasks);
    setItems(tasks);
  };

  const handleAddPost = async () => {
    const newPost = window.prompt("Enter post title:");
    const newBodypost = window.prompt("Enter body:");
    if (newPost && newBodypost && newBodypost.trim() !== "" &&  newPost.trim() !== "") {
      try {
        await RestAPI.addPostByUsername(
          user.username,
          user.id,
          newPost, 
          newBodypost
        );
        refreshPosts();
      } catch (error) {
        console.log("Error adding post:", error);
      }
    }
  };

  const deletePost = async (postId) => {
    try {
      await RestAPI.deletePostByUsername(user.username, postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatePostTitle = async (postId, title) => {
    try {
      await RestAPI.updatePostTitle(user.username, postId, title);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, title } : post
        )
      );
    } catch (error) {
      console.error("Error updating post title:", error);
    }
  };

  const handlePostClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  useEffect(() => {
    const selectedPostIndex = posts.findIndex(
      (post) => post.id === selectedPostId
    );
    if (
      selectedPostIndex !== -1 &&
      postContentRef.current[selectedPostIndex]
    ) {
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
            </div>
            {selectedPostId === post.id && (
              <>
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <button
                  onClick={() =>
                    updatePostTitle(post.id, "Updated Post Title")
                  }
                >
                  Update Title
                </button>
              </>
            )}
          </div>
        ))}
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    </>
  );
}

export default Posts;
