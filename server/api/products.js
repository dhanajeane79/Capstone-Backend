const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../db/products');
const { client } = require("../db/client");

// GET - /api/products - get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET - /api/products/:id - get a single product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST - /api/products - create a new product
router.post('/', async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/products/:id - update a single product by id
router.put('/:id', async (req, res, next) => {
  try {
    const product = await updateProduct({ id: req.params.id, ...req.body });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/products/:id - delete a single product by id
router.delete('/:id', async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    // Query the database to fetch the product by its ID
    const query = `
      SELECT p.id, p.name, p.description, pi.product_image, pi.item_price
      FROM products p
      JOIN product_item pi ON p.id = pi.product_id
      WHERE p.id = $1;
    `;
    const values = [productId];
    const { rows } = await client.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = rows[0];
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;






// GET - /api/products - get all products
// router.get('/', async (req, res, next) => {
//     try {
//         const products = await getAllProducts();
//         res.send(products);
//     } catch (error) {
//         next(error);
//     }
// });

// // GET - /api/products/:id - get a single product by id
// router.get('/:id', async (req, res, next) => {
//     try {
//         const product = await getProductById(req.params.id);
//         res.send(product);
//     } catch (error) {
//         next(error);
//     }
// });

// // POST - /api/products - create a new product
// router.post('/', async (req, res, next) => {
//     try {
//         const product = await createProduct(req.body);
//         res.send(product);
//     } catch (error) {
//         next(error);
//     }
// });

// // PUT - /api/products/:id - update a single product by id
// router.put('/:id', async (req, res, next) => {
//     try {
//         const product = await updateProduct(req.params.id, req.body);
//         res.send(product);
//     } catch (error) {
//         next(error);
//     }
// });

// // DELETE - /api/products/:id - delete a single product by id
// router.delete('/:id', async (req, res, next) => {
//     try {
//         const product = await deleteProduct(req.params.id);
//         res.send(product);
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = router;
