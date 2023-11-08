const { User } = require('../../models');
const ApiError = require('../error/api-error');
import 'dotenv/config';
const bcrypt = require('bcrypt');
interface IUser {
  dataValues: { email: string; displayName: string; role: string; id: number; password: string };
}
export const UserService = {
  registration: async (email: string, passwrod: string, displayName: string, role: string, moderatorCode: string) => {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(`User with this email:${email} exist `);
    }

    moderatorCode === process.env.MODERATOR_CODE ? (role = process.env.MODERATOR_ROLE) : (role = process.env.CUSTOMER_ROLE);
    const hashPassword = await bcrypt.hash(passwrod, 3);
    const newUser: IUser = await User.create({ email, password: hashPassword, displayName, role });
    const { email: userEmail, id, displayName: displayUserName, role: userRole } = newUser.dataValues;

    return {
      user: {
        userEmail,
        id,
        displayUserName,
        userRole,
      },
    };
  },

  login: async (emailUser, password) => {
    const user: IUser = await User.findOne({ where: { email: emailUser } });

    if (!user) {
      throw ApiError.BadRequest('User with this email was not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.dataValues.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }
    const { email, id, role, displayName } = user.dataValues;

    return {
      user: {
        email,
        id,
        role,
        displayName,
      },
    };
  },
  getUser: async (email: string) => {
    const user: IUser = await User.findOne({ where: { email: email } });
    const { email: userEmail, id, role, displayName } = user.dataValues;
    return {
      user: {
        userEmail,
        id,
        role,
        displayName,
      },
    };
  },
};
