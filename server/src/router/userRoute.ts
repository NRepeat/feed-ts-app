import express from 'express';
const userRouter = express.Router();
const UserController = require('../controllers/userController');

userRouter.route('/registration').post(UserController.rgistration);
userRouter.route('/login').post(UserController.login);
// userRouter.route('/logout').post(UserController.logout);
userRouter.route('/getUser/:email').get(UserController.getUser);
module.exports = userRouter;
