const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, getAllUsers, getUserById, getUserByEmail, getUser} = require('../db');
const { requireUser } = require('./utils');
const { JWT_SECRET = 'neverTell' } = process.env;

// const { getAllUsers,
//     getUserById,
//     createUser,
//     getUserByEmail
//     // updateUser,
//     // deleteUser 
// } = require('../db');


// POST /api/users/login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  // request must have both
  if (!email || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both an email and password'
    });
  }

  try {
    const user = await getUser({ email, password });
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    } else {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1w' });
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    // const { user, username, email, password } = req.body;

    const {username, email, password} = req.body.user;
console.log(req.body);
// console.log(user);
// console.log(username);
// console.log(email);
// console.log(password);
// console.log(user.username);
    // Check if the password is provided and is a string
    
    if (!password || typeof password !== 'string') {
      res.status(400); // Bad Request
      return next({
        name: 'InvalidPasswordError',
        message: 'Invalid password provided',
      });
    }

    if (password.length < 8) {
      res.status(401);
      return next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!'
      });
    }

    const queriedUser = await getUserByEmail(email);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user with that email already exists'
      });
    } else {
      const user = await createUser(
        username,
        email,
        password
      );
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "you're signed up!", token });
      }
    } 
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error)
  }
});

// GET - /api/users - get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/:id - get a single user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// POST - /api/users - create a new user
router.post('/', async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/users/:id - update a single user by id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/users/:id - delete a single user by id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;