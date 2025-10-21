const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        brand: { type: String, required: true, default: 'Unknown' },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        user: {  
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   
            required: true
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema);
