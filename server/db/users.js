const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// POST - /api/users - create a new user
async function createUser( username, email, password ) {
  const password_hash = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, email, password_hash)
            VALUES($1, $2, $3)
            RETURNING *;
        `,
      [username, email, password_hash]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// // GET - /api/users - get all users
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users;
    `);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id = $1;
      `,
      [id]
    );
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE email = $1;
      `,
      [email]
    );
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const password_hash = await bcrypt.hash(password, SALT_COUNT);
    const passwordsMatch = await bcrypt.compare(password, password_hash);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/users/:id - update a user by ID
async function updateUser(userId, updatedFields) {
  try {
    const { email, password } = updatedFields;
    let updateQuery = 'UPDATE users SET ';
    const queryParams = [];

    if (email) {
      updateQuery += 'email = $1';
      queryParams.push(email);
    }

    if (password) {
      if (email) {
        updateQuery += ', ';
      }
      updateQuery += 'password_hash = $2';
      queryParams.push(await bcrypt.hash(password, SALT_COUNT));
    }

    updateQuery += ' WHERE id = $3 RETURNING *;';
    queryParams.push(userId);

    const { rows: [updatedUser] } = await client.query(updateQuery, queryParams);

    // Check if user was updated
    if (!updatedUser) {
      return null; // User not found or update failed
    }

    // Remove password_hash from the response
    delete updatedUser.password_hash;

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  getUserByEmail,
  //     deleteUser
};
