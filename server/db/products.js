const client = require('./client');
const util = require('util');

// GET - /api/products - get all products
async function getAllProducts() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM products;
        `);
        return rows;
    } catch (err) {
        throw err;
    }
}

// GET - /api/products/:id - get a single product by id
async function getProductById(id) {
    try {
        const { rows: [product] } = await client.query(`
            SELECT * FROM products
            WHERE id = $1;
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
}

// POST - /api/products - create a new product
async function createProduct(body) {
    const { product_name, description, price, inStock, imgUrl } = body;
    try {
        const { rows: [product] } = await client.query(`

            INSERT INTO products(product_name, description, price, "inStock", "imgUrl")
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [product_name, description, price, inStock, imgUrl]);
        return product;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/products/:id - update a single product by id
async function updateProduct(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [product] } = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return product;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/products/:id - delete a single product by id
async function deleteProduct(id) {
    try {
        const { rows: [product] } = await client.query(`
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
