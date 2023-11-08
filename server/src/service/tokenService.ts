import 'dotenv/config';
const ApiError = require('../error/api-error');
const { Status } = require('../../models');
export const TokenService = {
  saveStatus: async (userId: string, status: string, expire: string) => {
    try {
      const statusData = await Status.findOne({
        where: {
          userId: userId,
        },
      });
      if (statusData) {
        await statusData.update({ status: status, expire: expire });
      } else {
        const userStatus = await Status.create({
          userId: userId,
          status: status,
          expire: expire,
        });
        return userStatus;
      }
    } catch (error) {
      throw ApiError.BadRequest('Error:', error);
    }
  },
  logout: async (userId: string) => {
    try {
      const updatedStatus = await Status.update(
        { status: false },
        {
          where: { userId: userId },
          fields: ['status'],
        }
      );

      if (updatedStatus[0] === 1) {
        return updatedStatus;
      } else {
        throw ApiError.BadRequest('User not found');
      }
    } catch (error) {
      throw ApiError.BadRequest('Error updating status:', error);
    }
  },
  login: async (userId: string) => {
    try {
      const updatedStatus = await Status.update(
        { status: true },
        {
          where: { userId: userId },
          fields: ['status'],
        }
      );

      if (updatedStatus[0] === 1) {
        throw ApiError.BadRequest('Status updated successfully');
      } else {
        throw ApiError.BadRequest('User not found');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  },
  findStatus: async (userId: string) => {
    const userStatus = await Status.findOne({ where: { userId: userId } });
    return userStatus;
  },
};
