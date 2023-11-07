import express from 'express';
const userRouter = express.Router();
const UserController = require('../controllers/userController');

userRouter.route('/registration').post(UserController.rgistration);
userRouter.route('/login/').post(UserController.login);
userRouter.route('/logout/:userId').put(UserController.logout);
userRouter.route('/getUser/:email').get(UserController.getUser);
userRouter.route("/status/:userId/:status/:expire").post(UserController.setStatus)
module.exports = userRouter;
