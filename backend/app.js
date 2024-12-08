import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
 mongoose .connect(process.env.MONGO_URI, ) 
 .then(() => console.log("MongoDB connected")) 
 .catch((error) => console.error(error));
 
// Routes
// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json({ product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product by ID
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Modified!', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app;
