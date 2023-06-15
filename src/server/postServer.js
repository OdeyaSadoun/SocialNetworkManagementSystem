const express = require("express");
const connection = require("./connection.js");
const app = express();
app.use(express.json());

app.get("/api/posts", (req, res) => {
  // get all posts
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve posts" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/posts/user/:username", (req, res) => {
  // get posts by username
  const username = req.params.username;
  connection.query(
    "SELECT posts.* FROM posts JOIN users ON posts.userid = users.id WHERE users.username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
        return;
      }
      res.json(results);
    }
  );
});

app.get("/api/posts/user/:username/completed", (req, res) => {
  // get completed posts of a specific user
  const username = req.params.username;
  connection.query(
    "SELECT posts.* FROM posts JOIN users ON posts.userid = users.id WHERE users.username = ? AND posts.completed = true",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve completed posts" });
        return;
      }
      res.json(results);
    }
  );
});

app.get("/api/posts/user/:username/incomplete", (req, res) => {
  // get incomplete posts of a specific user
  const username = req.params.username;
  connection.query(
    "SELECT posts.* FROM posts JOIN users ON posts.userid = users.id WHERE users.username = ? AND posts.completed = false",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve incomplete posts" });
        return;
      }
      res.json(results);
    }
  );
});

app.post("/api/posts", (req, res) => {
  // add a new post
  const { userid, title, completed } = req.body;
  connection.query(
    "INSERT INTO posts (userid, title, completed) VALUES (?, ?, ?)",
    [userid, title, completed],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add new post" });
        return;
      }
      res.json({
        message: "Post added successfully",
        postId: results.insertId,
      });
    }
  );
});

app.put("/api/posts/:postId/completed", (req, res) => {
  // update post completion status
  const postId = req.params.postId;
  const { completed } = req.body;
  connection.query(
    "UPDATE posts SET completed = ? WHERE id = ?",
    [completed, postId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res
          .status(500)
          .json({ error: "Failed to update post completion status" });
        return;
      }
      res.json({ message: "Post completion status updated successfully" });
    }
  );
});

app.put("/api/posts/:postId", (req, res) => {
  // update post content
  const postId = req.params.postId;
  const { title } = req.body;
  connection.query(
    "UPDATE posts SET title = ? WHERE id = ?",
    [title, postId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update post content" });
        return;
      }
      res.json({ message: "Post content updated successfully" });
    }
  );
});

app.delete("/api/posts/:postId", (req, res) => {
  // delete a post
  const postId = req.params.postId;
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [postId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to delete post" });
        return;
      }
      res.json({ message: "Post deleted successfully" });
    }
  );
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
