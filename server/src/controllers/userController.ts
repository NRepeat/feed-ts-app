import { UserService } from '../service/userService';
const ApiError = require('../error/api-error');
import { NextFunction, Request, Response } from 'express';
module.exports.rgistration = async (req: Request, res: Response, next: any) => {
  try {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }
    const { email, password } = req.body;
    const userData = await UserService.registration(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 60, httpOnly: true });
    res.send({ data: userData });
  } catch (error) {
    next(error);
  }
};
module.exports.login = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body;
    const userData = await UserService.login(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.send({ data: userData });
  } catch (e) {
    next(e);
  }
};
module.exports.logout = async (req: Request, res: Response, next: any) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await UserService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.send({ data: token });
  } catch (e) {
    next(e);
  }
};
module.exports.refresh = async (req: Request, res: Response, next: any) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await UserService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.send({ data: userData });
  } catch (e) {
    next(e);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.send({ data: users });
  } catch (e) {
    next(e);
  }
};
