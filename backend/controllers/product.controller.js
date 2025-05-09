
import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        
        const products = await Product.find({ deleted: false });

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const deletedProduct = await Product.findByIdAndUpdate(id, { deleted: true }, { new: true });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product marked as deleted" });
    } catch (error) {
        console.log("Error in soft deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        // Find and update the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("Error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
