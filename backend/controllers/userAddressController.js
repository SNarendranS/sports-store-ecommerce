const UserAddress = require('../models/UserAddress');
const User = require('../models/User');

// ✅ Create a new address
exports.createAddress = async (req, res) => {
  try {
    const { userid, addressLine1, addressLine2, addressLine3, city, state, pincode } = req.body;

    if (!userid || !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findByPk(userid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddress = await UserAddress.create({
      userid,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      state,
      pincode,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📜 Get all addresses for a specific user
exports.getUserAddresses = async (req, res) => {
  try {
    const { userid } = req.params;

    const addresses = await UserAddress.findAll({
      where: { userid },
      order: [['createdAt', 'DESC']],
    });

    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 🔍 Get a single address by ID
exports.getAddressById = async (req, res) => {
  try {
    const { addressid } = req.params;
    const address = await UserAddress.findByPk(addressid);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✏️ Update an address
exports.updateAddress = async (req, res) => {
  try {
    const { addressid } = req.params;
    const updated = await UserAddress.update(req.body, {
      where: { addressid },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Address not found or no changes made' });
    }

    const updatedAddress = await UserAddress.findByPk(addressid);
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ❌ Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressid } = req.params;
    const deleted = await UserAddress.destroy({
      where: { addressid },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
