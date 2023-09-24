CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES product_category(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    product_image TEXT
    price DECIMAL(10, 2)
);

CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    parent_category_id INT,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE product_item (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    qty_in_stock INT,
    product_image TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE user_address (
    user_id INT REFERENCES users(id),
    address_id INT REFERENCES address(id),
    is_default BOOLEAN
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street_number VARCHAR(255),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip VARCHAR(10)
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(id) ON DELETE CASCADE,
    product_item_id INT REFERENCES product_item(id),
    quantity INT NOT NULL
);





      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        category_id INT,
        name VARCHAR(255),
        description TEXT,
        product_image VARCHAR(255) DEFAULT 'https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_4x3.jpg',
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

const defaultImage = '';

    await client.query(`
      INSERT INTO product_category (parent_category_id, category_name)
      VALUES
        (1, 'for_the_loved_one'),
        (2, 'for_the_caregiver'),
        (3, 'at_the_end');
    `);

    await client.query(`
      INSERT INTO products (category_id, name, description, product_image)
      VALUES
        (4, 'iPhone 12', 'Apple iPhone 12 with A14 Bionic chip', '${defaultImage}'),
        (4, 'Samsung Galaxy S21', 'Samsung Galaxy S21 with 5G support', '${defaultImage}'),
        (5, 'MacBook Air', 'Apple MacBook Air with M1 chip', '${defaultImage}'),
        (5, 'Dell XPS 13', 'Dell XPS 13 laptop with Intel Core i7', '${defaultImage}'),
        (6, 'Men\'s T-Shirt', 'Casual men\'s t-shirt in various colors', '${defaultImage}'),
        (6, 'Women\'s Dress', 'Elegant women\'s dress for special occasions', '${defaultImage}'),
        (7, 'Sofa Set', '3-piece sofa set for your living room', '${defaultImage}'),
        (8, 'Coffee Maker', 'Automatic coffee maker for your kitchen', '${defaultImage}');
    `);

    await client.query(`
      INSERT INTO product_item (product_id, qty_in_stock, product_image, price)
      VALUES
        (1, 100, '${defaultImage}', 799.99),
        (1, 50, '${defaultImage}', 799.99),
        (2, 75, '${defaultImage}', 699.99),
        (2, 60, '${defaultImage}', 699.99),
        (3, 30, '${defaultImage}', 999.99),
        (3, 20, '${defaultImage}', 999.99),
        (4, 40, '${defaultImage}', 1199.99),
        (4, 35, '${defaultImage}', 1199.99),
        (5, 200, '${defaultImage}', 19.99),
        (5, 150, '${defaultImage}', 19.99),
        (6, 120, '${defaultImage}', 49.99),
        (6, 90, '${defaultImage}', 49.99),
        (7, 10, '${defaultImage}', 799.99),
        (7, 5, '${defaultImage}', 799.99),
        (8, 25, '${defaultImage}', 49.99),
        (8, 15, '${defaultImage}', 49.99);
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
      
      
      
      
        await client.query(`
      INSERT INTO products (category_id, name, description, product_image)
      VALUES
        (4, 'iPhone 12', 'Apple iPhone 12 with A14 Bionic chip', '${defaultImage}'),
        (4, 'Samsung Galaxy S21', 'Samsung Galaxy S21 with 5G support', '${defaultImage}'),
        (5, 'MacBook Air', 'Apple MacBook Air with M1 chip', '${defaultImage}'),
        (5, 'Dell XPS 13', 'Dell XPS 13 laptop with Intel Core i7', '${defaultImage}'),
        (6, 'Men\'s T-Shirt', 'Casual men\'s t-shirt in various colors', '${defaultImage}'),
        (6, 'Women\'s Dress', 'Elegant women\'s dress for special occasions', '${defaultImage}'),
        (7, 'Sofa Set', '3-piece sofa set for your living room', '${defaultImage}'),
        (8, 'Coffee Maker', 'Automatic coffee maker for your kitchen', '${defaultImage}');
    `);

    await client.query(`
      INSERT INTO product_item (product_id, qty_in_stock, product_image, price)
      VALUES
        (1, 100, '${defaultImage}', 799.99),
        (1, 50, '${defaultImage}', 799.99),
        (2, 75, '${defaultImage}', 699.99),
        (2, 60, '${defaultImage}', 699.99),
        (3, 30, '${defaultImage}', 999.99),
        (3, 20, '${defaultImage}', 999.99),
        (4, 40, '${defaultImage}', 1199.99),
        (4, 35, '${defaultImage}', 1199.99),
        (5, 200, '${defaultImage}', 19.99),
        (5, 150, '${defaultImage}', 19.99),
        (6, 120, '${defaultImage}', 49.99),
        (6, 90, '${defaultImage}', 49.99),
        (7, 10, '${defaultImage}', 799.99),
        (7, 5, '${defaultImage}', 799.99),
        (8, 25, '${defaultImage}', 49.99),
        (8, 15, '${defaultImage}', 49.99);
    `);




      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        category_id INT,
        name VARCHAR(255),
        description TEXT,
        product_image VARCHAR(255) DEFAULT 'https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_4x3.jpg',
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


          DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS product_item CASCADE;