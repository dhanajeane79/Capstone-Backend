require('dotenv').config();
const express = require('express');
const server = express();
const morgan = require('morgan');

const cors = require('cors');
const {PORT = 4000} = process.env;

const client = require('./db/client');
client.connect();

server.use(cors());

// logging middleware
server.use(morgan('dev'));
// parsing middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Serve Docs
const path = require('path');
server.use('/docs', express.static(path.join(__dirname, 'public')));

// Router: /api
server.use('/api', require('./api'));

server.get('/', (req, res) => {
  res.redirect('/docs');
});

// 404 handler
server.get('*', (req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

// error handling middleware
server.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message, table: error.table});
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

















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
