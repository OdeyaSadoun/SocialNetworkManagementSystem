import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <h2>Comments for Post {postId}</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p>No comments found for the post.</p>
      )}
    </>
  );
}

export default Comments;
