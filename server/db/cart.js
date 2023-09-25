const client = require('./client');

// Add item to the cart
async function addToCart(userId, productItemId, quantity) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO cart_items (cart_id, product_item_id, quantity)
      VALUES (
        (SELECT id FROM cart WHERE user_id = $1),
        $2,
        $3
      )
      RETURNING *;
    `,
      [userId, productItemId, quantity]
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
      UPDATE cart_items
      SET quantity = $1
      WHERE id = $2
      RETURNING *;
    `,
      [quantity, cartItemId]
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
      DELETE FROM cart_items
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
      SELECT cart_items.id, cart_items.quantity, products.product_name, products.price
      FROM cart_items
      JOIN product_items ON cart_items.product_item_id = product_items.id
      JOIN products ON product_items.product_id = products.id
      WHERE cart_items.cart_id = (SELECT id FROM cart WHERE user_id = $1);
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