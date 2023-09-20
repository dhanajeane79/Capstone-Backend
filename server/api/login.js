// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { createUser, getUserByEmail } = require('../db/users'); // Import a function to retrieve user data by email

// // POST /api/login
// router.post('/users/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Received login request for email:', email);

//   // Fetch user by email from the database
//   try {
//     const user = await getUserByEmail(email);

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Compare the provided password with the stored password
//     const passwordMatch = await bcrypt.compare(password, user.password_hash);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // If authentication is successful, generate a JWT
//     const token = jwt.sign({ userId: user.id, email: user.email }, '7367f6c194a2982ebc00c571dc2158598e652b2bf44096cc5c0ec887d1ab02b4', {
//       expiresIn: '1h', // Token expiration time
//     });

//     console.log('Authentication successful for email:', email);

//     // Return the token to the client
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;