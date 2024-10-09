"use strict";
const express = require("express");
const path = require('path');
const fs = require('fs');
const cors = require("cors");
const morgan = require('morgan');
const helmet = require("helmet");
const pool = require('./config/db');
require("dotenv").config();  


const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

const router = express.Router();


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(helmet()); 
app.use(morgan("common"));


app.use('/api', router);

//Dynamic Route Path
const routesPath = path.join(__dirname, '/routes');
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((routeFile) => {
  if (routeFile !== 'index.js' && routeFile.endsWith('.js')) {
    const routeModule = require(path.join(routesPath, routeFile));
    routeModule(router); 
  }
});

// Check the database connection
pool.connect((err) => {
  if (err) {
    console.error('Unable to connect to the database', err);
  } else {
    console.log('Database connected successfully!');
  }
});

app.get("/api/health", (req, res) => {
  try {
    res.json({ status: 1, msg: "Backend Server is Running! 🚀" });
  } catch (error) {
    res.status(403).json({ error: "error occured", message: error });
  }
});

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL..");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});