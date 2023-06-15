const express = require('express');
const users = require('./userServer');
const todos = require('./todosServer');

const app = express();

app.use(express.json());
app.use('/api/users', users);
app.use('/api/todos', todos);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
