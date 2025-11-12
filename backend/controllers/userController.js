import User from '../schemas/User.js';

// Get user by username
export const getUser = async (req, res) => {
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
export const getUserById = async (req, res) => {
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
export const updateUser = async (req, res) => {
  try {
    const { userid } = req.user
    const { updateDetail } = req.body;

    if (!updateDetail) {
      return res.status(400).json({ message: 'Missing user detail or update detail.' });
    }

    // Find user by provided filter (preferably { id } or { email })
    const user = await User.findOne({ where: userid });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Prevent sensitive field updates
    const restrictedFields = ['password', 'role', 'id', 'createdAt', 'updatedAt'];
    for (const field of restrictedFields) {
      if (updateDetail.hasOwnProperty(field)) {
        delete updateDetail[field];
      }
    }

    // Perform update
    await user.update(updateDetail);

    // Fetch updated data (clean response)
    const updatedUser = await User.findOne({
      where: userid,
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: error.message });
  }
};


