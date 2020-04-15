// server.js
require('dotenv').config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const app = express();
const cors = require("cors");
const path = require('path');
const {ApolloServer} = require('apollo-server-express');

const insertManyProducts = require("./app/routes/insertManyProducts");

const parser = require("./app/parser/parser");

const PORT = process.env.PORT || 8080;

//parser();

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nikito599-db-8fcy5.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(cors());

//app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));



const dbConnection = mongoose.connection;
dbConnection.on("error", err => {
  console.log(`Connection error: ${err}`);
});
dbConnection.once("open", () => {
  console.log("Connected to DB!");
  insertManyProducts();
});

app.use(express.static('./build'));

const server = new ApolloServer({ schema })

server.applyMiddleware({ app })

app.listen(PORT, err => {
  err ? console.log(err) : console.log("Server started!");
});
