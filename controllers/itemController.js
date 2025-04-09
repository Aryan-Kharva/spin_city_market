const Item = require('../models/itemModel');
const mongoose = require('mongoose');

exports.getAllItems = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const filter = {
            active: true,
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { details: { $regex: searchQuery, $options: 'i' } }
            ]
        };
        const activeItems = await Item.find(filter).sort({ price: 1 });
        res.render('items', { items: activeItems, searchQuery });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getItemDetails = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send('400\nInvalid item ID');
        }
        const item = await Item.findById(itemId);
        if (item) {
            res.render('item', { item, searchQuery: '' });
        } else {
            next({ status: 404, message: `There is no item with id ${itemId}` });
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// render form for creating a new item
exports.renderNewItemForm = (req, res) => {
    res.render('new', { searchQuery: '' });
};

// Create a new item and redirect it to the items list
exports.createNewItem = async (req, res) => {
    console.log(req.body);

//CITATION: https://www.w3schools.com/jsref/jsref_parsefloat.asp
//used parsefloat to fix the price
    try {
        const newItem = new Item({
            title: req.body.title,
            seller: req.body.seller,
            artist: req.body.artist,
            condition: req.body.condition,
            price: parseFloat(req.body.price),
            details: req.body.details,
            image: req.file ? "/assets/images/" + req.file.filename : "/assets/images/logo.png"
        });

        await newItem.save();

        console.log('Saved item to MongoDB:', newItem);
        res.redirect('/items');
    } catch (err) {
        console.error('Validation error:', err);

        if (err.name === 'ValidationError') {
            res.status(400).render('error', {
                error: {
                    status: 400,
                    message: 'Validation Error: ' + err.message
                },
                searchQuery: ''
            });
        } else {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    message: 'Server Error: ' + err.message
                },
                searchQuery: ''
            });
        }
    }
};


// render form to edit an existing item
exports.renderEditItemForm = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send('400\nInvalid item ID');
        }
        const item = await Item.findById(itemId);
        if (item) {
            res.render('edit', { item, searchQuery: '' });
        } else {
            next({
                status: 404,
                message: `There is no item with id ${itemId} to edit`
            });
        }
    } catch (err) {
        next(err);
    }
};

// update an existing item and redirect it to the item details page
exports.updateItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send('400\nInvalid item ID');
        }
        const updatedData = {
            title: req.body.title,
            artist: req.body.artist,
            condition: req.body.condition,
            price: req.body.price,
            details: req.body.details,
            seller: req.body.seller,
            image: req.file ? "/assets/images/" + req.file.filename : undefined
        };
        const updatedItem = await Item.findByIdAndUpdate(itemId, updatedData, { new: true });
        if (updatedItem) {
            res.redirect(`/items/${itemId}`);
        } else {
            next({ status: 404, message: `There is no item with id ${itemId} to update` });
        }
    } catch (err) {
        res.status(400).send('400\nValidation error');
    }
};

// Delete an existing item and redirect to the items list
exports.deleteItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).send('400\nInvalid item ID');
        }
        const deletedItem = await Item.findByIdAndUpdate(itemId, { active: false });
        if (deletedItem) {
            res.redirect('/items');
        } else {
            next({ status: 404, message: `There is no item with id ${itemId} to delete` });
        }
    } catch (err) {
        res.status(500).send('500\nServer error');
    }
};

 


