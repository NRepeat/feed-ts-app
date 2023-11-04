import { UserService } from '../service/userService';
const ApiError = require('../error/api-error');
import { Request, Response } from 'express';
module.exports.rgistration = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password, name, role, moderatorCode } = req.body;
    const userData = await UserService.registration(email, password, name, role, moderatorCode);
    res.cookie('refreshToken', userData);
    res.send({ data: userData });
  } catch (error) {
    next(error);
  }
};
module.exports.login = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body;
    const userData = await UserService.login(email, password);
    res.send({ data: userData });
  } catch (e) {
    next(e);
  }
};
module.exports.getUser = async (req: Request, res: Response, next: any) => {
  try {
    const { email } = req.params;
    const userData = await UserService.getUser(email);
    res.send({ data: userData });
  } catch (error) {
    next(error);
  }
};
// module.exports.logout = async (req: Request, res: Response, next: any) => {
//   try {
//     const { refreshToken } = req.cookies;
//     const token = await UserService.logout(refreshToken);
//     res.clearCookie('refreshToken');
//     res.send({ data: token });
//   } catch (e) {
//     next(e);
//   }
// };
