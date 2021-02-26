const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//Connect to database

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rk5qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{ useNewUrlParser: true },  () => {
    console.log("connected to db");
});

//Import routes

const authRoutes = require('./routes/auth');

//Route Middleware
app.use('/api/user', authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT} `)
});