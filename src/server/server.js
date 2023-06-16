const express = require('express');
const users = require('./userServer');
const todos = require('./todosServer');
const posts = require('./postServer');
const app = express();

app.use(express.json());
app.use(users);  
app.use(todos);  
app.use(posts);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
