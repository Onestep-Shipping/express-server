const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Schema = require('./schema/schema');

const app = express();
app.use(fileUpload());

require('dotenv').config();

// CORS
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials",true);
  next();
});

// DB Config
const uri = process.env.DB_URI;

// Connect to Mongo
mongoose.connect(uri, { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Bodyparser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({limit: "50mb", extended: false, parameterLimit: 50000}));
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));
app.use('/', require('./schema/upload'));
app.use(express.static('public')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));