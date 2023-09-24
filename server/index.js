
const express = require('express');
const cors = require('cors');
const path = require('path');
const server = express();
const { requireUser } = require('./api/utils');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT = 4000, JWT_SECRET = 'neverTell' } = process.env;
const client = require('./db/client');
require('dotenv').config();
client.connect();

// routes



// Middleware

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
// server.use(express.json());

const products = require('./api/products');

const { addToCart, getUserCart } = require('./db/cart');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

// Serve Docs

server.use('/docs', express.static(path.join(__dirname, 'public')));

// Routes


server.use('/api/products', products);

// POST - Add item to the cart
server.post('/api/cart/add', requireUser, async (req, res) => {
  try {
    // Extract the user ID, product ID, and quantity from the request body
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    // Call the addToCart function to add the item to the cart
    const cartItem = await addToCart(userId, productId, quantity);

    // Return a success response with the added cart item
    res.json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    // If there was an error, return an error response
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', message: error.message });
  }
});

// GET - Fetch cart items
server.get('/api/cart/items', requireUser, async (req, res) => {
  try {
    // Extract the user ID from the request object
    const { userId } = req.user;

    // Call the getUserCart function to fetch the user's cart items
    const cartItems = await getUserCart(userId);

    // Return the cart items as a JSON response
    res.json(cartItems);
  } catch (error) {
    // If there was an error, return an error response
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items', message: error.message });
  }
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
