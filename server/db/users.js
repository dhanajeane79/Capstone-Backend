const client = require('./client');
const util = require('util');

// GET - /api/users - get all users
async function getAllUsers() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM user;
        `);
        return rows;
    } catch (err) {
        throw err;
    }
}

// GET - /api/users/:id - get a single user by id
async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE id = $1;
        `, [id]);
        return user;
    } catch (error) {
        throw error;
    }
}

// POST - /api/users - create a new user
async function createUser(body) {
    const { username, email, password_hash } = body;
    try {
        const { rows: [user] } = await client.query(`

            INSERT INTO users(name, email, password_hash)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [username, email, password_hash]);
        return user;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/users/:id - update a single user by id
async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return user;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/users/:id - delete a single user by id
async function deleteUser(id) {
    try {
        const { rows: [user] } = await client.query(`
            DELETE FROM users
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
