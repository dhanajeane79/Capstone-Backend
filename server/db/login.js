// const client = require('./client');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Function to hash a password
// async function hashPassword(password) {
//   const saltRounds = 10; // You can adjust the number of salt rounds as needed

//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (error) {
//     throw error;
//   }
// }

// // Function to authenticate user login
// async function loginUser(email, password) {
//   try {
//     // Fetch user by email from the database
//     const { rows: [user] } = await client.query(`
//       SELECT * FROM users
//       WHERE email = $1;
//     `, [email]);

//     if (!user) {
//       return null; // User with the provided email not found
//     }

//     // Compare the provided password with the stored hashed password (password_hash column)
//     const passwordMatch = await bcrypt.compare(password, user.password_hash);

//     if (!passwordMatch) {
//       return null; // Passwords do not match
//     }

//     // If authentication is successful, generate a JWT
//     const token = jwt.sign({ userId: user.id, email: user.email }, '7367f6c194a2982ebc00c571dc2158598e652b2bf44096cc5c0ec887d1ab02b4', {
//       expiresIn: '1h', // Token expiration time
//     });

//     return token; // Return the token
//   } catch (error) {
//     throw error; // Handle database or other errors
//   }
// }

// module.exports = {
//   loginUser,
//   hashPassword, // Export the hashPassword function for use in user registration, for example
// };