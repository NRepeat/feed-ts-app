import 'dotenv/config';
const { Status } = require('../../models');
export const TokenService = {
  saveStatus: async (userId, status) => {
    try {
      const statusData = await Status.findOne({
        where: {
          userId: userId,
        },
      });
      if (statusData) {
        await statusData.update({ status: status });
      } else {
        const userStatus = await Status.create({
          userId: userId,
          status: status,
        });
        return  userStatus;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  removeStatus: async (status) => {
    const userStatus = await Status.destroy({ where: {  status: status } });
    return userStatus;
  },


  findStatus: async (status) => {
    const userStatus = await Status.findOne({ where: {  status: status } });
    return userStatus;
  },
};
