const Cart = require('../schemas/Cart');
const Product = require('../schemas/Product');
const User = require('../schemas/User');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userid } = req.user
    const { productid, quantity } = req.body;

    // Check if product already in cart
    let cartItem = await Cart.findOne({ where: { userid, productid } });

    if (cartItem) {
      // If exists, increment quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userid, productid, quantity: quantity || 1 });
    }

    res.status(200).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all items in a user's cart
exports.getUserCart = async (req, res) => {
  try {
    const { userid } = req.user;

    const cartItems = await Cart.findAll({
      where: { userid }
      // ,
      // include: [
      //   { model: Product, attributes: ['id', 'name', 'price', 'img'] }
      // ]
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Update quantity of a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid, quantity } = req.body;

    let cartItem = await Cart.findOne({ where: { userid, productid } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart updated', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.body;

    const deleted = await Cart.destroy({ where: { userid, productid } });

    if (!deleted) return res.status(404).json({ message: 'Cart item not found' });

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.findItemCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.query; 
    const cartItem = await Cart.findOne({
      where: { userid, productid }

    });
    if (cartItem)
      res.status(200).json(cartItem);
    else
      res.status(404).json({ message: "item not found" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};