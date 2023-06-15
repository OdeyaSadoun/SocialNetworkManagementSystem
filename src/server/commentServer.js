const express = require("express");
const connection = require("./connection.js");
const app = express();
app.use(express.json());

app.get("/api/comments", (req, res) => {
  // get comments by post id
  connection.query("SELECT * FROM comments", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve comments" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/comments", (req, res) => {
  // add new comment to comments
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

app.put("/api/comments/:commentId", (req, res) => {
  // update comment content
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

app.delete("/api/comments/:commentId", (req, res) => {
  // delete comment from the database
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

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
