const client = require("./client");
// drop tables for products and users
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS product_item CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS product_category CASCADE;
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
    CREATE TABLE product_category (
      id SERIAL PRIMARY KEY UNIQUE,
      parent_category_id INTEGER REFERENCES product_category(id),
      category_name VARCHAR(255)
  );

  CREATE TABLE products (
    id SERIAL PRIMARY KEY UNIQUE,
    category_id INTEGER REFERENCES product_category(id),
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE product_item (
  id SERIAL PRIMARY KEY UNIQUE,
  product_id INTEGER REFERENCES products(id),
  product_image VARCHAR,
  item_price NUMERIC(10, 2)
);

    `);
      
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log("Creating Initial Data...");
    await client.query(`
    INSERT INTO product_category (category_name)
    VALUES
      ('Have Some Fun'),
      ('Spa Day'),
      ('Make Memories');
    `);
    await client.query(`
    INSERT INTO products (category_id, name, description)
    VALUES
      (1, 'Guess Who', 'Board Game with People and Pets.'),
      (1, 'Monopoly', 'Marvel Spidey and His Amazing Friends Edition Board Game.'),
      (1, 'Laptop', 'Powerful laptop for professional use.'),
      (2, 'T-shirt', 'Comfortable cotton T-shirt.'),
      (2, 'T-shirt', 'Comfortable cotton T-shirt.'),
      (2, 'Jeans', 'Classic blue jeans for everyday wear.'),
      (3, 'Garden Tools', 'Essential tools for gardening.'),
      (3, 'Garden Tools', 'Essential tools for gardening.');
    `);

    await client.query(`
    INSERT INTO product_item (product_id, product_image, item_price)
VALUES
  (1, 'https://m.media-amazon.com/images/I/81mFyh0CKQL._AC_UL480_FMwebp_QL65_.jpg', 14),
  (2, 'https://m.media-amazon.com/images/I/81kRPyouyuL._AC_UL480_FMwebp_QL65_.jpg', 16);
  
  
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





















/*

const client = require("./client");

// Drop tables for products and users
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS product_item CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS product_category CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    `);
  } catch (error) {
    throw error;
  }
}

// Build tables for products and users
async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`
      CREATE TABLE product_category (
        id SERIAL PRIMARY KEY,
        parent_category_id INT,
        category_name VARCHAR(255),
        FOREIGN KEY (parent_category_id) REFERENCES product_category(id)
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        category_id INT,
        name VARCHAR(255),
        description TEXT,
        product_image TEXT,
        FOREIGN KEY (category_id) REFERENCES product_category(id)
      );

      CREATE TABLE product_item (
        id SERIAL PRIMARY KEY,
        product_id INT,
        qty_in_stock INT,
        product_image TEXT,
        price DECIMAL(10, 2),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(100) UNIQUE,
        password_hash VARCHAR(255)
      );
    `);
  } catch (error) {
    throw error;
  }
}

// Create initial data for products and users
async function createInitialData() {
  try {
    console.log("Creating Initial Data...");
    await client.query(`
      INSERT INTO product_category (parent_category_id, category_name)
      VALUES
        (NULL, 'Electronics'),
        (NULL, 'Clothing'),
        (NULL, 'Home and Garden'),
        (1, 'Smartphones'),
        (1, 'Laptops'),
        (2, 'Men\'s Clothing'),
        (2, 'Women\'s Clothing'),
        (3, 'Furniture'),
        (3, 'Kitchen Appliances');
    `);

    await client.query(`
      INSERT INTO products (category_id, name, description, product_image)
      VALUES
        (4, 'iPhone 12', 'Apple iPhone 12 with A14 Bionic chip', 'iphone12.jpg'),
        (4, 'Samsung Galaxy S21', 'Samsung Galaxy S21 with 5G support', 's21.jpg'),
        (5, 'MacBook Air', 'Apple MacBook Air with M1 chip', 'macbook.jpg'),
        (5, 'Dell XPS 13', 'Dell XPS 13 laptop with Intel Core i7', 'xps13.jpg'),
        (6, 'Men\'s T-Shirt', 'Casual men\'s t-shirt in various colors', 'mens-shirt.jpg'),
        (6, 'Women\'s Dress', 'Elegant women\'s dress for special occasions', 'womens-dress.jpg'),
        (7, 'Sofa Set', '3-piece sofa set for your living room', 'sofa-set.jpg'),
        (8, 'Coffee Maker', 'Automatic coffee maker for your kitchen', 'coffee-maker.jpg');
    `);

    await client.query(`
      INSERT INTO product_item (product_id, qty_in_stock, product_image, price)
      VALUES
        (1, 100, 'iphone12-001.jpg', 799.99),
        (1, 50, 'iphone12-002.jpg', 799.99),
        (2, 75, 's21-001.jpg', 699.99),
        (2, 60, 's21-002.jpg', 699.99),
        (3, 30, 'macbook-001.jpg', 999.99),
        (3, 20, 'macbook-002.jpg', 999.99),
        (4, 40, 'xps13-001.jpg', 1199.99),
        (4, 35, 'xps13-002.jpg', 1199.99),
        (5, 200, 'mens-shirt-001.jpg', 19.99),
        (5, 150, 'mens-shirt-002.jpg', 19.99),
        (6, 120, 'womens-dress-001.jpg', 49.99),
        (6, 90, 'womens-dress-002.jpg', 49.99),
        (7, 10, 'sofa-set-001.jpg', 799.99),
        (7, 5, 'sofa-set-002.jpg', 799.99),
        (8, 25, 'coffee-maker-001.jpg', 49.99),
        (8, 15, 'coffee-maker-002.jpg', 49.99);
    `);

    await client.query(`
      INSERT INTO users (username, email, password_hash)
      VALUES
        ('user1', 'user1@example.com', 'hashed_password1'),
        ('user2', 'user2@example.com', 'hashed_password2'),
        ('user3', 'user3@example.com', 'hashed_password3');
    `);
  } catch (error) {
    throw error;
  }
}

// Build all tables and create initial data
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
      
*/