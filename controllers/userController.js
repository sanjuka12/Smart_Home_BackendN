const UserModel = require('../models/userModel');


// ✅ Get single user by userName (passed from frontend)
const getUser = async (req, res) => {
  try {
    const { userName } = req.params; // from URL param

    if (!userName) {
      return res.status(400).json({ error: 'userName is required' });
    }

    const user = await UserModel.getUserByUserName(userName);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = {
  getUser,
};
