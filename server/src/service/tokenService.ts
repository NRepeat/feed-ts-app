import jwt from 'jsonwebtoken';
import 'dotenv/config'
const { Token } = require('../../models');
export const TokenService = {
  generateTokens: (payload:any) => {
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
};
