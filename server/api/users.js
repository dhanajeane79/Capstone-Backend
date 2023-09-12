const express = require('express');
const router = express.Router();

const { getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser } = require('../db/users');

// GET - /api/users - get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

// GET - /api/users/:id - get a single user by id
router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// POST - /api/users - create a new user
router.post('/', async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/users/:id - update a single user by id
router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/users/:id - delete a single user by id
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;