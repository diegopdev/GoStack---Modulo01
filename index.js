const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Requets Body = { "name": "Diego", "email": "diego@gmail.com" }

function checkUserExists(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: 'User name is required'})
  }

  return next();
}

function checkoutUserIndex(req, res, next){
  const { index }= req.params
  const user = users[index]

  if(!users[index]){
    return res.status(400).json({ error: 'User not exists'})
  }

  req.user = user

  return next();
}

const users = ['Usuario1', 'Usuario2', 'Usuario3'];

server.get('/users', (req, res) => {
  return res.json({ users: users });
});

server.get('/users/:index', checkoutUserIndex, (req, res) => {
  return res.json(req.user );
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkoutUserIndex, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;
  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.json(users);
});

server.listen(3000);
