// const client = require('./client');
// const bcrypt = require('bcrypt');

// // Function declaration for registerUser
// async function registerUser({ email, password }) {
//   try {
//     // Check if the email is already in use
//     const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (existingUser.rows.length > 0) {
//       throw new Error('Email already in use');
//     }

//     // Hash the user's password before storing it
//     const saltRounds = 10; // You can adjust the number of salt rounds as needed
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Insert the new user into the database with the hashed password
//     const { rows: [user] } = await client.query(`
//       INSERT INTO users(email, password_hash)
//       VALUES($1, $2)
//       RETURNING *;
//     `, [email, passwordHash]);

//     return user;
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {
//   registerUser,
// };