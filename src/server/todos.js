const express = require("express");
const connection = require("./connection.js");
const app = express();
app.use(express.json());

app.get("/api/todos", (req, res) => {
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

app.get("/api/todos/user/:userId", (req, res) => {
  // get todos by user id
  const userId = req.params.userId;
  connection.query(
    "SELECT * FROM todos WHERE userid = ?",
    [userId],
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

app.get("/api/todos/user/:userId/completed", (req, res) => {
  // get completed todos of a specific user:
  const userId = req.params.userId;
  connection.query(
    "SELECT * FROM todos WHERE userid = ? AND completed = true",
    [userId],
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

app.get("/api/todos/user/:userId/incomplete", (req, res) => {
  //get incomplete todos of a specific user:
  const userId = req.params.userId;
  connection.query(
    "SELECT * FROM todos WHERE userid = ? AND completed = false",
    [userId],
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

app.post("/api/todos", (req, res) => {
  //add new task to todos
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

app.put("/api/todos/:taskId/completed", (req, res) => {
  // update task completion status:
  const taskId = req.params.taskId;
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

app.put("/api/todos/:todoId", (req, res) => {
  // update task content
  const taskId = req.params.taskId;
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

app.delete("/api/todos/:taskId", (req, res) => {
  // Deletion from the database will be performed when this task is not needed-
  // for example, a task that should not be performed at all.
  const taskId = req.params.taskId;
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
