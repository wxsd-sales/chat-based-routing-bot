/* IMPORTS */

require('dotenv').config();
let { eventListener } = require('./components/webexFunc.js');
let { botSetup } = require('./components/webexFunc.js');

let { mongoClient } = require('./utils/db.js');

/* FUNCTIONS */

mongoClient.connect((err) => {
  if (!err) {
    console.log('mongo connection established.');
    botSetup();
    eventListener();
  } else {
    console.error('Error while trying to connect to MongoDB');
  }
});
