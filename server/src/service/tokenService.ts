import jwt from 'jsonwebtoken';
const { Token } = require('../../models');
export const TokenService = {
  generateTokens: (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '130m' });
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
