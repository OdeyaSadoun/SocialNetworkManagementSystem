const express = require('express');
const connection = require('./connection.js');
const app = express();
app.use(express.json());


// get all users
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



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
