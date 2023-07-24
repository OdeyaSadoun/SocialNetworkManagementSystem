import React, { useState, useEffect, useContext, useRef } from "react";
import { userContext } from "../App";
import "./Posts.css";
import RestAPI from "../server/RestAPI";
import { Link } from "react-router-dom";
function Posts() {
  const { id: userId } = useContext(userContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
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

  const refreshPosts = async () => {
    const posts = await RestAPI.getPostsByUsername(user.username);
    setPosts(posts);
  };

  const handleAddPost = async () => {
    const newPostTitle = window.prompt("Enter post title:");
    const newPostBody = window.prompt("Enter post body:");
    if (
      newPostTitle &&
      newPostBody &&
      newPostTitle.trim() !== "" &&
      newPostBody.trim() !== ""
    ) {
      try {
        await RestAPI.addPostByUsername(
          user.username,
          user.id,
          newPostTitle,
          newPostBody
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
      setSelectedPostId(null); // Reset the selected post id after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatePostTitle = async (postId, newTitle) => {
    try {
      await RestAPI.updatePostTitle(user.username, postId, newTitle);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, title: newTitle } : post
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
            </div>
            {selectedPostId === post.id && (
              <>
                <Link to={`/${userId}/Posts/${post.id}/Comments`}>Comment</Link>

                <button onClick={() => deletePost(post.id)}>Delete</button>
                <button
                  onClick={() => {
                    const newTitle = window.prompt(
                      "Enter new post title:",
                      post.title
                    );
                    if (newTitle && newTitle.trim() !== "") {
                      updatePostTitle(post.id, newTitle);
                    }
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddPost}>Add Post</button>
    </>
  );
}

export default Posts;
