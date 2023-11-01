const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');





app.use(cors());
app.use(express.static('public'));
app.use(router);

module.exports = app;
