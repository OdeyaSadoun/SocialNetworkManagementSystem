const express = require("express");
const connection = require("./connection.js");
const app = express();
app.use(express.json());

// Get todos by ID
app.get("/api/todos/:id", (req, res) => {
  const userId = req.params.id;
  connection.query(
    "SELECT * FROM todos WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve todos for the user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found- so todos not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Get all todos
app.get("/api/todos", (req, res) => {
  connection.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve todos" });
      return;
    }
    res.json(results);
  });
});