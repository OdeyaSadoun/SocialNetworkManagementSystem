const express = require("express");
const connection = require("./connection.js");
const router = express.Router();
const app = express();
app.use(express.json());

router.get("/api/todos", (req, res) => {
  // get all todos
  connection.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve todos" });
      return;
    }
    res.json(results);
  });
});

router.get("/api/users/:username/todos", (req, res) => {
  // get todos by user id - with the username in the url
  const username = req.params.username;
  connection.query(
    "SELECT todos.* FROM todos JOIN users ON todos.userid = users.id WHERE users.username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve tasks" });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/api/users/:username/todos/completed", (req, res) => {
  // get complete todos of a specific user - with the username in url
  const username = req.params.username;
  connection.query(
    "SELECT todos.* FROM todos JOIN users ON todos.userid = users.id WHERE users.username = ? AND todos.completed = true",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve completed todos" });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/api/users/:username/todos/incomplete", (req, res) => {
  // get complete todos of a specific user - with the username in url
  const username = req.params.username;
  connection.query(
    "SELECT todos.* FROM todos JOIN users ON todos.userid = users.id WHERE users.username = ? AND todos.completed = false",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve incomplete todos" });
        return;
      }
      res.json(results);
    }
  );
});

router.post("/api/users/:username/todos", (req, res) => {
  //add new task to todos
  const username = req.params.username;
  const { userid, title, completed } = req.body;
  connection.query(
    "INSERT INTO todos (userid, title, completed) VALUES (?, ?, ?)",
    [userid, title, completed],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add new task" });
        return;
      }
      res.json({
        message: "Task added successfully",
        taskId: results.insertId,
      });
    }
  );
});

router.put("/api/users/:username/todos/:taskId/editcompleted", (req, res) => {
  // update task completion status:
  const taskId = req.params.taskId;
  const username = req.params.username;
  const { completed } = req.body;
  connection.query(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, taskId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res
          .status(500)
          .json({ error: "Failed to update task completion status" });
        return;
      }
      res.json({ message: "Task completion status updated successfully" });
    }
  );
});

router.put("/api/users/:username/todos/:taskId/edittitle", (req, res) => {
  // update task content
  const taskId = req.params.taskId;
  const username = req.params.username;
  const { title } = req.body;
  connection.query(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, taskId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update task content" });
        return;
      }
      res.json({ message: "Task content updated successfully" });
    }
  );
});

router.delete("/api/users/:username/todos/:taskId", (req, res) => {
  // Deletion from the database will be performed when this task is not needed-
  // for example, a task that should not be performed at all.
  const taskId = req.params.taskId;
  const username = req.params.username;
  connection.query(
    "DELETE FROM todos WHERE id = ?",
    [taskId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to delete task" });
        return;
      }
      res.json({ message: "Task deleted successfully" });
    }
  );
});

module.exports = router;