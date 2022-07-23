// require all the libraries we need
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // we will have all our environment variables in the dotenv file

const app = express(); // creates our express server
const port = process.env.PORT || 5000; // the port our server will be on

const uri = process.env.ATLAS_URI; // our database uri where our database is stored (we have to grab from mongodb)

mongoose.connect(uri, {}); // make these particular flags to true

const connection = mongoose.connection;
connection.once('open', () => { 
    console.log("MongoDB database connection established successfully");
}) // once the connection is open, log that MongoDB database connection has been established successfully


app.use(cors()); // middlewear that allows us to parse json
app.use(express.json());

const studentsRouter = require('./routes/students'); // remember the path to our students router database

app.use('/students', studentsRouter); // when someone visits our url/students, they will be rerouted to our students database


app.listen(port, () => { // starts the server i.e. starts listening on a certain port
    console.log('Server is running on port: ' + port);
});
