import Cart from '../schemas/Cart.js';
import Product from '../schemas/Product.js';
import User from '../schemas/User.js';
import * as productController from './productController.js';
// Add item to cart
export const addToCart = async (req, res) => {
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

export const getUserCart = async (req, res) => {
  try {
    const { userid } = req.user;
   
    const result = await Cart.findAndCountAll({
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


// Update quantity of a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid, quantity } = req.body;

    let cartItem = await Cart.findOne({ where: { userid, productid } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    const stock = await Product.findByPk(productid);
    if (stock && (quantity > stock.dataValues.availableStock))
      return res.status(400).json({ message: 'Requested quantity not available in stock' });
    else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }
    res.status(200).json({ message: 'Cart updated', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
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

export const findItemCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productid } = req.params;
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