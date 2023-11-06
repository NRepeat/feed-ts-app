const { User } = require('../../models');
const ApiError = require('../error/api-error');
import 'dotenv/config';
const bcrypt = require('bcrypt');
export const UserService = {
  registration: async (email: string, passwrod: string, displayName: string, role: string, moderatorCode) => {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with this email:${email} exist `);
    }

    moderatorCode === process.env.MODERATOR_CODE  ? (role = process.env.MODERATOR_ROLE) : (role = process.env.CUSTOMER_ROLE);
    const hashPassword = await bcrypt.hash(passwrod, 3);
    const newUser = await User.create({ email, password: hashPassword, displayName, role });
    const { email: userEmail, id, displayName: displayUserName, role: userRole } = newUser;

    return {
      user: {
        userEmail,
        id,
        displayUserName,
        userRole,
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
    const { email: userEmail, id, role, displayName } = user;

    return {
      user: {
        userEmail,
        id,
        role,
        displayName,
      },
    };
    
  },
  getUser: async (email: any) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
  },

};
