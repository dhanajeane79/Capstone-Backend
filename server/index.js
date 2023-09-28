
// Import necessary modules and setup

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { requireUser } = require('./api/utils');
const { PORT = 4000, JWT_SECRET = '7367f6c194a2982ebc00c571dc2158598e652b2bf44096cc5c0ec887d1ab02b4', REFRESH_TOKEN_SECRET = '7367f6c194a2982ebc00c571dc2158598e652b2bf44096cc5c0ec887d1ab02b4' } = process.env;

require('dotenv').config();

const client = require('./db/client');
client.connect();

const server = express();



// Middleware
server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Serve static files
server.use('/docs', express.static(path.join(__dirname, 'public')));

// 
// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify and decode the token using your JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Extract user information from the decoded token
    const user = decoded.user;

    // Attach the user information to the request object for later use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

// Token generation function (used during login and refresh)
function generateNewToken(user) {
  // Create a new JWT token with a new expiration time
  const newToken = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });

  return newToken;
}

// Function to generate a new access token and a refresh token
function generateNewTokens(user) {
  // Create a new access token with a short expiration time (1 hour)
  const accessToken = generateNewToken(user);

  // Create a new refresh token with a longer expiration time (7 days)
  const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}

// POST - Refresh access token using refresh token
server.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = decoded.user;

    // Generate a new access token
    const newAccessToken = generateNewTokens(user);

    // Send the new access token as a response
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
});

server.get('/user/me', verifyToken, async (req, res) => {
  try {
    // Access the user information from the decoded token
    const user = req.user;

    // Return the user information as a JSON response
    res.json(user);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Failed to fetch user information', message: error.message });
  }
});



server.get('/api/cart/items', verifyToken, async (req, res) => {
  try {
    // Retrieve cart items for the authenticated user
    const userId = req.user.id;
    console.log("User Information:", user);
    const cartItems = await getUserCart(userId);
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items', message: error.message });
  }
});

server.get('/api/having-some-fun', async (req, res) => {
  try {
    // Query your database to retrieve products with an ID of 1
    const products = await client.query('SELECT * FROM products WHERE id = 1');

    // Send the products as JSON in the response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
});

// Routes
server.use('/api/users', require('./api/users'));
server.use('/api/products', require('./api/products'));
server.use('/api/cart', require('./api/cart'));

// Root route
server.get('/', (req, res) => {
  res.redirect('/docs');
});

// 404 handler
server.get('*', (req, res) => {
  res.status(404).send({ error: '404 - Not Found', message: 'No route found for the requested URL' });
});

// Error handling middleware
server.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message, table: error.table });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// }
// );

















// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 4000;

// // init morgan
// const morgan = require("morgan");
// app.use(morgan("dev"));

// // init body-parser
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// // init cors
// const cors = require("cors");
// app.use(cors());

// // init db client
// const client = require("./db/client");
// client.connect();

// const loginRouter = require('./api/login');
// app.use('/api', loginRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/api/login", (req, res) => {
//   res.send("Hello Login!");
// });

// app.post("/api/login", (req, res) => {
// })


// // Router: /api
// app.use("/api", require("./api"));

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// app.use(express.json()); //req body

//Routes//

//create a product
// app.post("/products", async (req, res) => {
//     try {
//       const { product_name } = req.body;
//       const newProduct = await pool.query(
//         "INSERT INTO product (product_name) VALUES($1) RETURNING *",
//         [product_name]
//       );

//       res.json(newProduct.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //get all products
// app.get("/products", async (req, res) => {
//     try {
//       const allProducts = await pool.query("SELECT * FROM product");

//       res.json(allProducts.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //get a single product
// app.get("/products/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const product = await pool.query("SELECT * FROM product WHERE product_id = $1", [
//         id,
//       ]);

//       res.json(product.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //update a product
// app.put("/products/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { product_name } = req.body;
//       const updateProduct = await pool.query(
//         "UPDATE product SET product_name = $1 WHERE product_id = $2",
//         [product_name, id]
//       );

//       res.json("Product was updated!");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// //delete a product
// app.delete("/products/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleteProduct = await pool.query("DELETE FROM product WHERE product_id = $1", [
//         id,
//       ]);

//       res.json("Product was deleted!");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });

// app.listen(2000, () => {
//     console.log("The server has started on Port 5000");
//   });
