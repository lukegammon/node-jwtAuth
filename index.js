const express = require("express");
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();

//Import routes

const authRoute = require('./routes/auth');

//Connect to database

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },  () => {
    console.log("connected to db");
});

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT} `)
});

