import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import RestAPI from "../server/RestAPI";

function Comments() {
  const { postId } = useParams();
  const { username } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await RestAPI.getCommentsByPostId(
          username,
          postId
        );
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, username]);

  const handleAddComment = async () => {
    try {
      await RestAPI.addCommentToPost(username, postId, comment);
      // Clear the comment input field and update the comments list
      setComment("");
      fetchComments(); // Call fetchComments to update the comments after adding a new one
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const updateCommentContent = async (commentId, newContent) => {
    try {
      await RestAPI.updateCommentContent(
        username,
        postId,
        commentId,
        newContent
      );
      fetchComments();
    } catch (error) {
      console.error("Error updating comment content:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await RestAPI.deleteComment(username, postId, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <h2>Comments for Post {postId}</h2>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            {/* <input
              type="text"
              value={comment.newContent || ""}
              onChange={(e) => {
                const { value } = e.target;
                setComments((prevComments) =>
                  prevComments.map((c) => {
                    if (c.id === comment.id) {
                      return { ...c, newContent: value };
                    }
                    return c;
                  })
                );
              }}
            /> */}
                <button
                  onClick={() => {
                    const newComment = window.prompt(
                      "Enter update comment:",
                      comment.title
                    );
                    if (newComment && newComment.trim() !== "") {
                      updateCommentContent(comment.id, newComment);
                    }
                  }}
                >
                  Edit
                </button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No comments found for the post.</p>
      )}
    </>
  );
}

export default Comments;
