const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    seller: { type: String, required: true },
    condition: { 
        type: String, 
        enum: ['Mint', 'Near Mint', 'Very Good', 'Good', 'Poor'], 
        required: true 
    },
    price: { type: Number, required: true, min: 0.01 },
    details: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true }
});

//NOTE: it wasn't storing in the marketplace database specifically, so i had to add 'marketplace' and it worked. 
const Item = mongoose.model('Item', itemSchema, 'marketplace');

module.exports = Item;
