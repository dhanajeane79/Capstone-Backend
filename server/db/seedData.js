const client = require("./client");

// drop tables for products and users
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    throw error;
  }
}

// build tables for products and users
async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) UNIQUE ,
        description TEXT ,
        price INTEGER ,
        "inStock" BOOLEAN DEFAULT false,
        "imgUrl" VARCHAR(255) DEFAULT 'https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_4x3.jpg'
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email varchar(100)  UNIQUE,
        password_hash varchar(255) 
      );
    `);
    
  } catch (error) {
    throw error;
  }
}

// create initial data for products and users
async function createInitialData() {
  try {
    console.log("Creating Initial Data...");
    await client.query(`
      INSERT INTO products (product_name, description, price, "inStock", "imgUrl")
      VALUES
        ('Suction Grab Bar 2 Pack Safety Grab Bar', 'Strong Hold Suction Handle for Bathroom Shower!', 10, true, 'https://target.scene7.com/is/image/Target/GUEST_7289ed25-cd3d-4873-8243-303e0364d03e?wid=1200&hei=1200&qlt=80&fmt=webp'),
        ('Adult Cozy Soft Microfiber Neck Pillow', 'TOur neck pillow offers perfect support that will keep your head, neck & shoulders from feeling fatigued', 15, true, 'https://m.media-amazon.com/images/I/713a7pJ0u3L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),
        ('DEIRO Bedding Flannel Fleece Blanket', 'Living Room Microfiber Soft Cozy Lightweight Plush Blankets', 50, true, 'https://m.media-amazon.com/images/I/71M36k-QHgL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),
        ('Medline Mobility Lightweight Folding Steel Rollator Walker', 'Adjustable Seat and Arms, Light Blue', 100, true, 'https://m.media-amazon.com/images/I/71aTBZR9NpL._SX522_.jpg'),
        ('Stroller Cup Holder with Phone Holder', 'Universal Cup Phone Holder for Stroller, Bike, Wheelchair, Walker, Scooter!', 5, true, 'https://m.media-amazon.com/images/I/31OaQlCsrHL._SX300_SY300_QL70_FMwebp_.jpg'),
        ('Medical Adjustable Bedside Table', 'Plastic Dining Board with 4 casters with Breaks', 190, true,  'https://m.media-amazon.com/images/I/61MZdDxdXhL.__AC_SX300_SY300_QL70_FMwebp_.jpg')
    `);

    await client.query(`
      INSERT INTO users (username, email, password_hash)
      VALUES
        ('dhanajeane', 'dhanajeane@gmail.com', 'asdfghjk'),
        ('dhana', 'dhana@gmail.com', 'asdfghjk'),
        ('dhanajeane79', 'dhanajeane79@gmail.com', 'asdfghjk'),
        ('donna', 'donna@gmail.com', 'asdfghjk'),
        ('dhanaWhana', 'dhanawhana@gmail.com', 'asdfghjk')
    `);

  } catch (error) {
    throw error;
  }
}

// build all tables and create initial data
async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
