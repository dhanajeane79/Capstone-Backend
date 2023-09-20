require('dotenv').config();

const config = {
  secretKey: process.env.JWT_SECRET_KEY,
  // Other configuration options...
};

module.exports = config;