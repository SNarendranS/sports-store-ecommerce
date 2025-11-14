import User from '../schemas/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login

export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email!" });

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password! Retry." });

    const { name, role, userid } = user;

    // JWT expires in 7 days if remember is true, otherwise 1 day
    const token = jwt.sign(
      { email, name, role, userid }, 
      process.env.JSON_SECRETKEY,
      { expiresIn: remember ? "7d" : "1d" } // backend expiration
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// User registration
export const register = async (req, res) => {
  try {
    const createUser = { ...req.body, role: 'user' };

    const user = await User.create(createUser);
    const { userid, name, email, role } = user;
    res.status(201).json({ userid, name, email, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin registration
export const adminRegister = async (req, res) => {
  try {
    const createUser = { ...req.body, role: 'admin' };

    const user = await User.create(createUser);
    const { userid, name, email, role } = user;
    res.status(201).json({ userid, name, email, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};