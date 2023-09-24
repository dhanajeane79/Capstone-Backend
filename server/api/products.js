const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../db/products");

// POST - /api/products - create a new product
router.post("/", async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// GET - /api/products - get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET - /api/products/:id - get a single product by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      next({
        name: "NotFound",
        message: `No product by ID ${id}`,
      });
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/products/:id - update a single product by id
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const productToUpdate = await getProductById(id);
    if (!productToUpdate) {
      next({
        name: "NotFound",
        message: `No product by ID ${id}`,
      });
    } else {
      const updatedProduct = await updateProduct({ id, ...req.body });
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next({
          name: "FailedToUpdate",
          message: "There was an error updating your product",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/products/:id - delete a single product by id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const productToUpdate = await getProductById(id);
    if (!productToUpdate) {
      next({
        name: "NotFound",
        message: `No product by ID ${id}`,
      });
    } else {
      const deletedProduct = await deleteProduct(id);
      res.send({ success: true, ...deletedProduct });
    }
  } catch (error) {
    next(error);
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
