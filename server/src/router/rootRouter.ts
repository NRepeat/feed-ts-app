import express from 'express';
const rootRouter = express.Router();
const postRouter = require('./postRoute');
const userRouter = require('./userRoute');
rootRouter.use('/posts', postRouter);
rootRouter.use('/user',userRouter)
module.exports = rootRouter;
