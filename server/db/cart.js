const client = require('./client');
const util = require('./util');

// Add item to the cart
async function addToCart(userId, productId, quantity) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [userId, productId, quantity]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Update item quantity in the cart
async function updateCartItemQuantity(cartItemId, quantity) {
  try {
    const { rows } = await client.query(
      `
      UPDATE cart
      SET quantity = $1
      WHERE id = $2
      RETURNING *;
    `,
      [cartItemId, quantity]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Remove item from the cart
async function removeFromCart(cartItemId) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM cart
      WHERE id = $1
      RETURNING *;
    `,
      [cartItemId]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

// Get user's cart contents
async function getUserCart(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT cart.id, cart.quantity, products.product_name, products.price
      FROM cart
      JOIN products ON cart.product_id = products.id
      WHERE cart.user_id = $1;
    `,
      [userId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  getUserCart,
};