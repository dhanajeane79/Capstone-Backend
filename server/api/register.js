// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// const { registerUser } = require('../db/register');

// router.post('/users/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Hash the user's password before registering
//     const saltRounds = 10; // You can adjust the number of salt rounds as needed
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const user = await registerUser({ email, password_hash: passwordHash }); // Pass the hashed password
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;