const client = require("./client");
const util = require("./util");

// GET - /api/products - get all products
async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT products.id, products.name, products.description, product_item.product_image, product_category.category_name, product_item.item_price
      FROM products
      JOIN product_item ON products.id = product_item.product_id
      JOIN product_category ON products.category_id = product_category.id;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - /api/products/:id - get a single product by id
async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT products.id, products.name, products.description, product_item.product_image, product_category.category_name
      FROM products
      JOIN product_item ON products.id = product_item.product_id
      JOIN product_category ON products.category_id = product_category.id
      WHERE products.id = $1;
      `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

// POST - /api/products - create a new product
async function createProduct({ productId, name, description, product_image, category_id, item_price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, category_id)
      VALUES($1, $2, $3)
      RETURNING *;
      `,
      [name, description, category_id]
    );

    // Insert into product_item table
    await client.query(
      `
      INSERT INTO product_item(product_id, product_image, item_price)
      VALUES($1, $2, $3);
      `,
      [product.id,  product_image, item_price]
    );

    return product;
  } catch (error) {
    throw error;
  }
}


// PUT - /api/products/:id - update a single product by id
async function updateProduct({ id, ...fields }) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }

    let product;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
        UPDATE products 
        SET ${util.dbFields(toUpdate).insert}
        WHERE id = $1
        RETURNING *;
        `,
        [id, ...Object.values(toUpdate)]
      );
      product = rows[0];

      // Update product_item table if necessary
      if (fields.qty_in_stock !== undefined || fields.product_image !== undefined) {
        await client.query(
          `
          UPDATE product_item 
          SET ${util.dbFields({ qty_in_stock: fields.qty_in_stock, product_image: fields.product_image }).insert}
          WHERE product_id = $1;
          `,
          [id, ...Object.values(toUpdate)]
        );
      }

      return product;
    }
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/products/:id - delete a single product by id
async function deleteProduct(id) {
  try {
    // Delete from product_item table
    await client.query(
      `
      DELETE FROM product_item
      WHERE product_id = $1;
      `,
      [id]
    );

    // Delete from products table
    await client.query(
      `
      DELETE FROM products 
      WHERE id = $1;
      `,
      [id]
    );

    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

