const express = require("express");
const connection = require("./connection.js");
const router = express.Router();
const app = express();
app.use(express.json());

router.get("/api/users/:username/posts/:postId/comments", (req, res) => {
  // get comments by post id
  const username = req.params.username;
  const postId = req.params.postId;
  connection.query(
    "SELECT * FROM comments WHERE postid = ?",
    [postId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve comments" });
        return;
      }
      res.json(results);
    }
  );
});

router.post("/api/users/:username/posts/:postId/comments", (req, res) => {
  // add new comment to comments
  const username = req.params.username;
  const { postid, content } = req.body;
  connection.query(
    "INSERT INTO comments (postid, content) VALUES (?, ?)",
    [postid, content],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add new comment" });
        return;
      }
      res.json({
        message: "Comment added successfully",
        commentId: results.insertId,
      });
    }
  );
});

router.put("/api/users/:username/posts/:postId/comments/:commentId/edit", (req, res) => {
  // update comment content
  const username = req.params.username;
  const commentId = req.params.commentId;
  const { content } = req.body;
  connection.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, commentId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update comment content" });
        return;
      }
      res.json({ message: "Comment content updated successfully" });
    }
  );
});

router.delete("/api/users/:username/posts/:postId/comments/:commentId", (req, res) => {
  // delete comment from the database
  const username = req.params.username;
  const commentId = req.params.commentId;
  connection.query(
    "DELETE FROM comments WHERE id = ?",
    [commentId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to delete comment" });
        return;
      }
      res.json({ message: "Comment deleted successfully" });
    }
  );
});

module.exports = router;
