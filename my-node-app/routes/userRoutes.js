const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdmin } = require('../middleware/auth');

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.render('register', { error: "Please fill in all fields." });
        }

        await User.create(req.body);
        res.redirect('/users/login');

    } catch (err) {
        if (err.code === 11000) {
            return res.render('register', { error: "Email already exists." });
        }
        next(err); 
    }
});

router.get('/login', (req, res) => {
    res.render('login', { error: null }); 
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOneAndUpdate(
            { email, password }, 
            { lastLogin: new Date() }, 
            { new: true } 
        );

        if (user) {
            res.render('index', { user: user });
        } else {
            res.render('login', { error: "Invalid email or password." });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/admin-panel', isAdmin, async (req, res, next) => {
    try {
        const allUsers = await User.find(); 
        res.render('admin-panel', { users: allUsers });
    } catch (err) { next(err); }
});

router.post('/delete/:id', isAdmin, async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users/admin-panel?role=admin'); 
    } catch (err) { next(err); }
});

router.get('/check-role', async (req, res, next) => {
    try {
        const result = await User.find(
            { email: req.query.email }, 
            { email: 1, role: 1, _id: 0 }
        ).hint({ email: 1, role: 1 });
        res.json(result);
    } catch (err) { next(err); }
});

router.get('/logout', (req, res) => {
    res.redirect('/users/login');
});

module.exports = router;