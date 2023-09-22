// const { Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/compcarestore';
// const client = new Client({
//     connectionString,
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
//   });

//   client.connect();

// // GET - /api/users - get all users
// async function getAllUsers() {
//     try {
//         const { rows } = await client.query(`
//             SELECT * FROM users;
//         `);
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }

// // GET - /api/users/:id - get a single user by id
// async function getUserById(id) {
//     try {
//         const { rows: [user] } = await client.query(`
//             SELECT * FROM users
//             WHERE id = $1;
//         `, [id]);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

// // POST - /api/users - create a new user
// async function createUser({ email, password_hash }) {
//     try {
//         const { rows: [user] } = await client.query(`
//             INSERT INTO users(email, password_hash)
//             VALUES($1, $2)
//             RETURNING *;
//         `, [email, password_hash]);

//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

// // PUT - /api/users/:id - update a single user by id
// async function updateUser(id, fields = {}) {
//     const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
//     if (setString.length === 0) {
//         return;
//     }
//     try {
//         const { rows: [user] } = await client.query(`
//             UPDATE users
//             SET ${setString}
//             WHERE id=${id}
//             RETURNING *;
//         `, Object.values(fields));
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

// async function getUserByEmail(email) {
//     try {
//       const query = 'SELECT * FROM users WHERE email = $1';
//       const values = [email];
//       const result = await client.query(query, values);

//       // Check if a user with the provided email exists
//       if (result.rows.length === 0) {
//         return null; // User not found
//       }

//       // Return the user object
//       return result.rows[0];
//     } catch (error) {
//       throw error; // Handle any database errors
//     }
// }

// // DELETE - /api/users/:id - delete a single user by id
// async function deleteUser(id) {
//     try {
//         const { rows: [user] } = await client.query(`
//             DELETE FROM users
//             WHERE id=$1
//             RETURNING *;
//         `, [id]);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

// module.exports = {
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     getUserByEmail,
//     deleteUser
// }

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

//  GET - /api/users/:id - get a single user by id
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
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

//  GET - /api/users/email - get a single user by email
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
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
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
