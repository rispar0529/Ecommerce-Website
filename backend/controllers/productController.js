const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, description, price, category, countInStock, image, brand } = req.body;
    // Validation
    if (!name || !description || price == null || !category || countInStock == null) {
        return res.status(400).json({ message: "Please fill all the required fields" });
    }

    try {
        const product = await Product.create({
            name,
            description,
            price,
            category,
            countInStock,
            image: image || null,
            brand: brand || 'Unknown',
            user: req.user ? req.user._id : undefined,
        });

        return res.status(201).json(product);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }   
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, countInStock, image, brand } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.countInStock = countInStock != null ? countInStock : product.countInStock;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        await product.save();
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;  
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }   
        await product.deleteOne();
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

