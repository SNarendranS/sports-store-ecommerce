const Favorite = require('../schemas/Favorite');

// Add item to favorites
exports.addToFav = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.body;

    // Check if product already in favorites
    let favItem = await Favorite.findOne({ where: { userid, productid } });

    if (favItem) {
      return res.status(200).json({ message: 'Item already in favorites', favItem });
    }

    // Add new favorite
    favItem = await Favorite.create({ userid, productid });

    res.status(201).json({ message: 'Item added to favorites', favItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all favorite items for a user
exports.getUserFav = async (req, res) => {
  try {
    const { userid } = req.user;

    const favItems = await Favorite.findAll({
      where: { userid },
      // Optionally include product details
      // include: [{ model: Product, attributes: ['id', 'name', 'price', 'img'] }]
    });

    res.status(200).json(favItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from favorites
exports.removeFromFav = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.body;

    const deleted = await Favorite.destroy({ where: { userid, productid } });

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite item not found' });
    }

    res.status(200).json({ message: 'Item removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
