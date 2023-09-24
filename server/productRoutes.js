const express = require('express');
const router = express.Router();

// Define your product-related routes here
router.get('/', (req, res) => {
  // Replace this with your actual product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      qty_in_stock: 10,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 24.99,
      qty_in_stock: 5,
    },
    // Add more products here...
  ];

  // Send the products as a JSON response
  res.json(products);
});

router.get('/:id', (req, res) => {
  // Replace this with your actual product data retrieval logic
  const productId = req.params.id;
  const product = {
    id: productId,
    name: `Product ${productId}`,
    description: `Description of Product ${productId}`,
    price: 19.99,
    qty_in_stock: 10,
  };

  // Send the product as a JSON response
  res.json(product);
});

// Export the router
module.exports = router;
