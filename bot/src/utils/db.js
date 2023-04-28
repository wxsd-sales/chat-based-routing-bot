/* IMPORTS */

require('dotenv').config();
const { MongoClient } = require('mongodb');

/* RUNTIME VARS */
const mongoUri = `${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(mongoUri);
const mongoDB = process.env.MONGO_DB;
const typeCol = 'customized';
const collectionType = 'details';

/* EXPORTS */

module.exports = { mongoClient, mongoDB, typeCol, collectionType };
