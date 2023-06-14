const { Category, Product } = require('../models')



const allCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id } , include: Product });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ message:  "Something went wrong"});
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Category.update({ name }, { where: { id } });
    res.status(201).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
     const category = await Category.findOne({ where: {id } });
    console.log(category)
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Category.destroy({ where: { id } });
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = {
  allCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};