import express from 'express';
const userRouter = express.Router();
const UserController = require('../controllers/userController');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
userRouter
  .route('/registration')
  .post(body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), UserController.rgistration);
userRouter.post('/login', UserController.login);
userRouter.route('/logout').post(UserController.logout);
userRouter.route('/refresh').post(UserController.refresh);
userRouter.route('/users').get(authMiddleware, UserController.getUsers);

module.exports = userRouter;
