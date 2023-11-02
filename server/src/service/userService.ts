const { User, Token } = require('../../models');
const ApiError = require('../error/api-error');
import 'dotenv/config';
const bcrypt = require('bcrypt');
import { TokenService } from './tokenService';
export const UserService = {
  registration: async (email: string, passwrod: string) => {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with this email:${email} exist `);
    }
    const hashPassword = await bcrypt.hash(passwrod, 3);

    const newUser = await User.create({ email, password: hashPassword });
    const { email: userEmail, id, isActivated } = newUser;
    const tokens = TokenService.generateTokens({ userEmail, id, isActivated });
    await TokenService.saveToken(id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        userEmail,
        id,
        isActivated,
      },
    };
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const { email: userEmail, id, isActivated } = user;
    const tokens = TokenService.generateTokens({ userEmail, id, isActivated });

    await TokenService.saveToken(id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        userEmail,
        id,
        isActivated,
      },
    };
  },
};
