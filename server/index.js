const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req body

//Routes//

//create a product
app.post("/products", async (req, res) => {
    try {
      const { name } = req.body;
      const newProduct = await pool.query(
        "INSERT INTO product (name) VALUES($1) RETURNING *",
        [name]
      );
  
      res.json(newProduct.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//get all products
app.get("/products", async (req, res) => {
    try {
      const allProducts = await pool.query("SELECT * FROM product");
  
      res.json(allProducts.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  

//get a single product
app.get("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await pool.query("SELECT * FROM product WHERE product_id = $1", [
        id,
      ]);
  
      res.json(product.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//update a product 
app.put("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateProduct = await pool.query(
        "UPDATE product SET name = $1 WHERE product_id = $2",
        [name, id]
      );
  
      res.json("Product was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

//delete a product
app.delete("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteProduct = await pool.query("DELETE FROM product WHERE product_id = $1", [
        id,
      ]);
  
      res.json("Product was deleted!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
app.listen(4000, () => {
    console.log("The server has started on Port 4000");
  });
  