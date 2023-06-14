const express = require('express');
const connection = require('./connection.js');
const app = express();
app.use(express.json());

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to retrieve user' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(results[0]);
    });
  });
  
// Get all users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve users' });
      return;
    }
    res.json(results);
  });
});



// add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to add user' });
      return;
    }
    res.json({ message: 'User added successfully' });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
