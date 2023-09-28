const client = require('./client');

// Add item to the cart
async function addToCart(userId, productItemId, quantity) {
  try {
    // Find the user's cart or create a new one if it doesn't exist
    const { rows: userCartRows } = await client.query(
      `
      SELECT id FROM cart WHERE user_id = $1;
      `,
      [userId]
    );

    let cartId;

    if (userCartRows.length === 0) {
      // Create a new cart for the user
      const { rows: newCartRows } = await client.query(
        `
        INSERT INTO cart (user_id)
        VALUES ($1)
        RETURNING id;
        `,
        [userId]
      );
      cartId = newCartRows[0].id;
    } else {
      cartId = userCartRows[0].id;
    }

    // Insert the item into the user's cart
    const { rows } = await client.query(
      `
      INSERT INTO cart_item (cart_id, product_item_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [cartId, productItemId, quantity]
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
      UPDATE cart_item
      SET quantity = $1
      WHERE id = $2
      RETURNING *;
    `,
      [cartItemId, quantity ]
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
// Get user's cart contents
async function getUserCart(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT cart_item.id, cart_item.quantity, products.name, product_item.item_price
      FROM cart_item
      JOIN product_item ON cart_item.product_item_id = product_item.id
      JOIN products ON product_item.product_id = products.id
      WHERE cart_item.cart_id = (SELECT id FROM cart WHERE user_id = $1);
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