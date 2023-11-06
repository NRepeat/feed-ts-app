import express from 'express';
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const router = require('./router/rootRouter');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public')); 
app.use(router);
app.use(errorMiddleware);
module.exports = app;
