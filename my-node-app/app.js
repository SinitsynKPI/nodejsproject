const express = require('express');
const path = require('path');
const dbConnect = require('./db/dbConnect');
const userRoutes = require('./routes/userRoutes');

const app = express();
dbConnect();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.get('/', (req, res) => res.redirect('/users/login'));
app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        statusCode = 400;
        message = "That email is already registered.";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    res.status(statusCode).render('error', { 
        message: message, 
        status: statusCode 
    });
});

module.exports = app;