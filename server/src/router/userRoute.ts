import express from 'express';

const userRouter = express.Router()

userRouter.post('/registration')
userRouter.post('/login')
userRouter.post('/logout')
userRouter.post('/activate/:link')
userRouter.post('/refresh')
userRouter.post('/moderator')


module.exports = userRouter