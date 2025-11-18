import Product from '../schemas/Product.js';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { img, name, des, category, price, discount, availableStock } = req.body;
        const product = await Product.create({
            img,
            name,
            des,
            category,
            price,
            discount: discount || null,
            availableStock
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// const getAllProducts = async (req, res) => {
//     try {
//         // const products = await Product.findAll(); 
//         const offset = parseInt(req.query.offset) || 0;
//         const limit = parseInt(req.query.limit) || 10000;

//         const products = await Product.findAll({
//             offset: parseInt(offset),
//             limit: parseInt(limit)
//         });
//         res.status(200).json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// const getAllOfferProducts = async (req, res) => {
//     try {
//         const offset = parseInt(req.query.offset) || 0;
//         const limit = parseInt(req.query.limit) || 10000;


//         const products = await Product.findAll({
//             where: { discount: { [Op.gt]: 0 } },
//             offset: parseInt(offset),
//             limit: parseInt(limit)
//         });
//         res.status(200).json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const getAllProducts = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10000;

    const { rows: products, count: totalCount } = await Product.findAndCountAll({
      offset,
      limit,
    });

    res.status(200).json({ products, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllOfferProducts = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10000;

    const { rows: products, count: totalCount } = await Product.findAndCountAll({
      where: { discount: { [Op.gt]: 0 } },
      offset,
      limit,
    });

    res.status(200).json({ products, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllProductsCategories = async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']
            ]
        });

        const categoryList = categories.map(c => c.category);

        res.status(200).json(categoryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { img, name, des, category, price, discount, availableStock } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({
            img,
            name,
            des,
            category,
            price,
            discount: discount || null,
            availableStock
        });

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const availableStock = async (req, res) => {

    try {
        const { productid } = req.body;
        const product = await Product.findByPk(productid);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ available: product.availableStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllOfferProducts,
    getAllProductsCategories,
    availableStock,
};
