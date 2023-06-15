const express = require("express");
const connection = require("./connection.js");
const app = express();
app.use(express.json());

app.get("/api/users", (req, res) => {
  // get all users
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/users/:id", (req, res) => {
  // get user by ID
  const userId = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

app.get("/api/users/login", (req, res) => {
  // get user by username and password
  const { username, password } = req.query;
  connection.query(
    "SELECT * FROM passwords WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

app.post("/api/users", (req, res) => {
  // add a new user
  const { name, username, email, phone } = req.body;
  connection.query(
    "INSERT INTO users (name, username, email, phone) VALUES (?,?,?,?)",
    [name, username, email, phone],
    (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add user" });
        return;
      }
      res.json({ message: "User added successfully" });
    }
  );
});

app.put("/api/users/:id/email", (req, res) => {
  //update email to user
  const userId = req.params.id;
  const { email } = req.body;
  connection.query(
    "UPDATE users SET email = ? WHERE id = ?",
    [email, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update email" });
        return;
      }

      res.json({ message: "Email updated successfully" });
    }
  );
});

app.put("/api/users/:id/phone", (req, res) => {
  // update phone to user
  const userId = req.params.id;
  const { phone } = req.body;
  connection.query(
    "UPDATE users SET phone = ? WHERE id = ?",
    [phone, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update phone" });
        return;
      }

      res.json({ message: "Phone updated successfully" });
    }
  );
});

app.put("/api/users/:id/name", (req, res) => {
  // update name of user
  const userId = req.params.id;
  const { name } = req.body;
  connection.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, userId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update name" });
        return;
      }

      res.json({ message: "Name updated successfully" });
    }
  );
});

app.put("/api/users/:id/password", (req, res) => {
  // update password to user
  const userId = req.params.id;
  const { password } = req.body;
  const { username } = req.body; // Assuming you provide the username in the request body

  connection.query(
    "UPDATE passwords SET password = ? WHERE username = ?",
    [password, username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update password" });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ message: "Password updated successfully" });
    }
  );
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
