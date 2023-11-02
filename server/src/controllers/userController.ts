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
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

//   login: async (req: Request, res: Response, next: any) => {

//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
//   logout: async (req: Request, res: Response, next: any) => {
//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
//   activateLink: async (req: Request, res: Response, next: any) => {
//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
//   refreshToken: async (req: Request, res: Response, next: any) => {
//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
// };
