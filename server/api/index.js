const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const client = require('../db/client');
const { JWT_SECRET = '7367f6c194a2982ebc00c571dc2158598e652b2bf44096cc5c0ec887d1ab02b4' } = process.env;

console.log('JWT_SECRET:', JWT_SECRET);
console.log('REFRESH_TOKEN_SECRET:', REFRESH_TOKEN_SECRET);

// GET /api/health
router.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const { rows: [dbConnection] } = await client.query('SELECT NOW();');
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', { timeStyle: 'long', dateStyle: 'long', timeZone: 'America/Los_Angeles' }).format(currentTime - uptime * 1000);
    res.send({ message: 'healthy', uptime, dbConnection, currentTime, lastRestart });
  } catch (err) {
    next(err);
  }
});

// Set `req.user` if possible
router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // Nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/products', productsRouter);

module.exports = router;



// Default route for the root URL path
// router.get('/', (req, res, next) => {
//     res.send('Welcome to your API');
//   });
// // GET /api/health
// router.get('/health', (req, res, next) => {
//     res.send('OK');
// });

// router.use('/products', require('./products'));

// router.use('/users', require('./users'));

// router.use('/users/register', require('./register'));

// router.use('/users/login', require('./login'));

// module.exports = router;