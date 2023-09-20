const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Log the secret key to the console
console.log('Generated Secret Key:', secretKey);