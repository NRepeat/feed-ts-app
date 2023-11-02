import express from 'express';
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const { body } = require('express-validator');
userRouter
  .route('/registration')
  .post(body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), UserController.rgistration);
userRouter.post('/login',UserController.login)
// userRouter.post('/logout')
// userRouter.post('/refresh')
// userRouter.post('/moderator')

module.exports = userRouter;
