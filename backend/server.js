const express = require('express');
//cors - Cross-origin resource sharding to allow AJAX requests to skip smae-origin policy and access resources from remote hosts
const cors = require('cors');
//Indicate mongoose is required
const mongoose = require('mongoose');

//dotenv loads environment variables from a .env file into process.env
require('dotenv').config();

//Create Express server
const app = express();
//Make server listen on port 5000
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Load the routers from other files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Use routers as middleware
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});