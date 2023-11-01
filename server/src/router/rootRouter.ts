import express from 'express';
const rootRouter = express.Router();
const postRouter = require("./postRoute")
rootRouter.use('/posts',postRouter);

module.exports = rootRouter;
