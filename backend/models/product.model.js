
import mongoose from "mongoose"; 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false  // New field for soft delete
    }
}, {
    timestamps: true 
});

// 🔧 Fix the typo in model name here:
const Product = mongoose.model('Product', productSchema);

export default Product;
