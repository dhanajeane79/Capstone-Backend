module.exports = {
    ...require('./products'),
    ...require('./users'),
    ...require('./cart'),
    ...require('./product_item'), // Include functions related to product_item table
    ...require('./product_category'), // Include functions related to product_category table
};