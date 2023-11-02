const { User, Token } = require('../../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
import { mailService } from './mailService';
import { TokenService } from './tokenService';
module.exports.UserService = {
  registration: async (email: string, passwrod) => {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw new Error(`User with this email:${email} exist `);
    }
    const hashPassword = await bcrypt.hash(passwrod, 3);
    const activateLink = uuid.v4();

    const newUser = await User.create({ email, hashPassword, activateLink });
    const { userEmail, id, isActivated } = newUser;
    await mailService.sendActivationLink(email, activateLink);
    const tokens = TokenService.generateTokens({ userEmail, id, isActivated });
    await Token.create(id, tokens.refreshToken);
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
