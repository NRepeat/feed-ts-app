import { TokenService } from '../service/tokenService';
import { UserService } from '../service/userService';
import { NextFunction, Request, Response } from 'express';
module.exports.rgistration = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password, name, role, moderatorCode } = req.body;
    const userData = await UserService.registration(email, password, name, role, moderatorCode);

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
module.exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const userData = await UserService.getUser(email);

    res.send({ data: userData });
  } catch (error) {
    next(error);
  }
};
module.exports.logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const logoutUser = await TokenService.logout(userId);

    res.send({ data: logoutUser });
  } catch (error) {
    next(error);
  }
};

module.exports.setStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, status, expire } = req.params;
    const response = await TokenService.saveStatus(userId, status, expire);

    res.send({ data: response });
  } catch (error) {
    next(error);
  }
};
