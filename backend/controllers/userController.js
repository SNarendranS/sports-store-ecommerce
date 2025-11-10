const User = require('../schemas/User');

// Get user by username
const getUser = async (req, res) => {
  const { email } = req.user;
  console.log('user', email)
  try {
    const user = await User.findOne({
      where: { email: email }, // assuming username maps to 'name'
      attributes: ['userid', 'email', 'role', 'name', 'phoneNumber'],
    });

    if (!user) return res.status(404).json({ message: 'User not available' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id, {
      attributes: ['userid', 'email', 'name', 'role', 'phoneNumber'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { userDetail, updateDetail } = req.body;

  try {
    // Find the user first
    const user = await User.findOne({ where: userDetail });

    if (!user) return res.status(400).json({ message: 'Cannot update — user does not exist' });

    // Update user
    await user.update(updateDetail);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  updateUser,
};
