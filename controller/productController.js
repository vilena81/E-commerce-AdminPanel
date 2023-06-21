const { Product, Category,  } = require('../models');



exports.allProduct = async (req, res) => {
    try {
        const product = await Product.findAll({ include: Category });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ where: { id } });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createProduct = async (req, res) => {
const { name, img, description, price, quantity, CategoryId } = req.body;
console.log(req.body)
    try {
        
        await Product.create({ name, img, description, price, quantity, CategoryId });
        res.status(201).json({ message: "Product created!" });
    } catch (err) {
        res.status(500).json({ message:err.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, img, description, price, quantity, CategoryId } = req.body;
    try {
      
        await Product.update({ name, img, description, price, quantity, CategoryId }, { where: { id } });

        res.status(200).json({ message: "Product updated" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};



