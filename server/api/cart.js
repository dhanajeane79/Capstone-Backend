const express = require("express");
const router = express.Router();
const { requireUser } = require("../db/util");


const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  getUserCart,
} = require("../db/cart");


// POST - /api/cart/add - Add item to the cart
router.post("/add", async (req, res, next) => {
 
  // const { userId } = req.user;
  const { productId, quantity, userId } = req.body;
// console.log(userId)

  try {
    const cartItem = await addToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/cart/update/:cartItemId - Update item quantity in the cart
// router.put("/update/:cartItemId", requireUser, async (req, res, next) => {
//   const { userId } = req.user;
//   const { cartItemId } = req.params;
//   const { quantity } = req.body;

//   try {
//     const updatedCartItem = await updateCartItemQuantity(cartItemId, quantity);
//     res.json(updatedCartItem);
//   } catch (error) {
//     next(error);
//   }
// });

// DELETE - /api/cart/remove/:cartItemId - Remove item from the cart
// router.delete("/remove/:cartItemId", requireUser, async (req, res, next) => {
//   const { userId } = req.user;
//   const { cartItemId } = req.params;

//   try {
//     const removedCartItem = await removeFromCart(cartItemId);
//     res.json(removedCartItem);
//   } catch (error) {
//     next(error);
//   }
// });

// GET - /api/cart/user - Get user's cart contents
// router.get("/items", requireUser, async (req, res, next) => {
//   const { userId } = req.user;

//   try {
//     const cartItems = await getUserCart(userId); // Use a function to fetch cart items
//     res.json(cartItems);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
