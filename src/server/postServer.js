const express = require("express");
const connection = require("./connection.js");
const router = express.Router();
const app = express();
app.use(express.json());

router.get("/api/posts", (req, res) => {
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

router.get("/api/users/:username/posts", (req, res) => {
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

router.get("/api/users/:username/posts/alphabeticalOrder", (req, res) => {
  // get posts by username in alphabetical order
  const username = req.params.username;
  connection.query(
    "SELECT posts.* FROM posts JOIN users ON posts.userid = users.id WHERE users.username = ? ORDER BY posts.title ASC",
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

router.post("/api/users/:username/posts", (req, res) => {
  // add a new post
  const username = req.params.username;
  const { userid, title, bodypost } = req.body;
  connection.query(
    "INSERT INTO posts (userid, title, body) VALUES (?, ?, ?)",
    [userid, title, bodypost],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add new post" });
        return;
      }
      res.json({
        message: "Post added successfully",
        postId: results.insertId,
        status: 201
      });
    }
  );
});

router.put("/api/users/:username/posts/:postId/edittitle", (req, res) => {
  // update post content
  const username = req.params.username;
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

router.put("/api/users/:username/posts/:postId/editbody", (req, res) => {
  // update post content
  const username = req.params.username;
  const postId = req.params.postId;
  const { body } = req.body;
  connection.query(
    "UPDATE posts SET title = ? WHERE id = ?",
    [body, postId],
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
// DELETE a post for a specific user
router.delete("/api/users/:username/posts/:postId", (req, res) => {
  const username = req.params.username;
  const postId = req.params.postId;

  connection.query(
    "DELETE comments, posts FROM comments INNER JOIN posts ON comments.post_id = posts.id WHERE posts.id = ?",
    [postId],
    (err, results) => {
      if (err) {
        console.error("Error deleting post and comments:", err);
        res.status(500).json({ error: "Failed to delete post" });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.json({ message: "Post deleted successfully" });
    }
  );
});


module.exports = router;
