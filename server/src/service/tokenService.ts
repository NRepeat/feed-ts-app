import 'dotenv/config';
const { Status } = require('../../models');
export const TokenService = {
  saveStatus: async (userId, status, expire) => {
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
      console.error('Error:', error);
      throw error;
    }
  },
  logout: async (userId) => {
    try {
      const updatedStatus = await Status.update(
        { status: false },
        {
          where: { userId: userId },
          fields: ['status'], 
        }
      );
    
      if (updatedStatus[0] === 1) {
        console.log('Status updated successfully');
      } else {
        console.log('User not found');
      }
    return updatedStatus;
  }catch (error) {
    console.error('Error updating status:', error);
  }
},
login: async (userId) => {
  try {
    const updatedStatus = await Status.update(
      { status: true },
      {
        where: { userId: userId },
        fields: ['status'], 
      }
    );
  
    if (updatedStatus[0] === 1) {
      console.log('Status updated successfully');
    } else {
      console.log('User not found');
    }
  return updatedStatus;
}catch (error) {
  console.error('Error updating status:', error);
}
},
  findStatus: async (userId) => {
    const userStatus = await Status.findOne( { where: { userId: userId } });
    return userStatus;
  },
udpate:async (statusId,expire) => {
  const userStatus = await Status.update(  {expire:expire }, { where: { statusId: statusId } });
}
};
