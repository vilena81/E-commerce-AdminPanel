const {PopularProduct}= require('../models');

exports.allPopularProduct = async (req, res) => {
    try {
        const product = await PopularProduct.findAll();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.createPopularProduct = async (req, res) => {
    const { name, img, price } = req.body;
    console.log(req.body)
        try {
            
            await PopularProduct.create({ name, img,  price });
            res.status(201).json({ message: "Popular product created!" });
        } catch (err) {
            res.status(500).json({ message:err });
        }
    }
    
    exports.updatePopularProduct = async (req, res) => {
        const { id } = req.params;
        const { name, img, price } = req.body;
        try {
            await PopularProduct.update({ name, img, price }, { where: { id } });
    
            res.status(200).json({ message: "Popular product updated" });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    
    
    
    exports.deletePopularProduct = async (req, res) => {
        const { id } = req.params;
        try {
            const product = await PopularProduct.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: "Popular product not found" });
            }
            await PopularProduct.destroy({ where: { id } });
            res.status(200).json({ message: "Popular product deleted" });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong" });
        }
    };
    
    