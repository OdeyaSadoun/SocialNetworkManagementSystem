const express = require('express');
const users = require('./userServer');
const todos = require('./todosServer');
const posts = require('./postServer');
const comments = require('./commentServer');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS before the route middleware
app.use(express.json());
app.use(users);
app.use(todos);
app.use(posts);
app.use(comments);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
