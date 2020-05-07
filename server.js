const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

// CORS
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials",true);
  next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const uri = process.env.DB_URI;

// Connect to Mongo
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log("MongoDB connected!"))
        .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));