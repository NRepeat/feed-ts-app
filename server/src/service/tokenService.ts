import jwt from 'jsonwebtoken';
import 'dotenv/config';
const { Token } = require('../../models');
export const TokenService = {
  generateTokens: (payload: any) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '130m' });
    return {
      accessToken,
      refreshToken,
    };
  },
  saveToken: async (userId, refreshToken) => {
    try {
      const tokenData = await Token.findOne({
        where: {
          userId: userId,
        },
      });
      if (tokenData) {
        await tokenData.update({ refreshToken: refreshToken });
      } else {
        const token = await Token.create({
          userId: userId,
          refreshToken: refreshToken,
        });
        return token;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  removeToken: async (refreshToken) => {
    const tokenData = await Token.destroy({ where: { refreshToken: refreshToken } });
    return tokenData;
  },
  validateAccessToken: async (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken: async (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },
  findToken: async (refreshToken) => {
    const tokenData = await Token.findByPk({ where: { refreshToken: refreshToken } });
    return tokenData;
  },
};
