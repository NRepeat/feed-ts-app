import express from 'express';

const app = express();
const cors = require('cors');
const router = require('./router/rootRouter');




app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(router); 

module.exports = app;
