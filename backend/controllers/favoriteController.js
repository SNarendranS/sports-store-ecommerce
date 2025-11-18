import Favorite from '../schemas/Favorite.js';

// Add item to favorites
const addToFav = async (req, res) => {
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
const getUserFav = async (req, res) => {
  try {
    const { userid } = req.user;

    const result = await Favorite.findAndCountAll({
      where: { userid }
    });

    res.status(200).json({
      count: result.count,
      items: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// Remove item from favorites
const removeFromFav = async (req, res) => {
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

const findItemFav = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.params;
    const favItem = await Favorite.findOne({
      where: { userid, productid }

    });
    if (favItem)
      res.status(200).json(favItem);
    else
      res.status(404).json({ message: "item not found" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export { addToFav, getUserFav, removeFromFav, findItemFav }