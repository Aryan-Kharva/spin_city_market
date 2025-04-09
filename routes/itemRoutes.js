const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const multer = require('multer');

// set up multer for file uploads
const upload = multer({ dest: 'public/assets/images/' });

// Route to display all items or search results
router.get('/items', itemController.getAllItems);

// Route to display details of a single item
router.get('/items/:id', itemController.getItemDetails);

// Route to display the form for creating a new item
router.get('/new', itemController.renderNewItemForm);

// Route to create a new item (POST request)
router.post('/items', upload.single('image'), itemController.createNewItem);

// Route to display the form for editing an existing item
router.get('/items/:id/edit', itemController.renderEditItemForm);

// Route to update an existing item. use a POST request!!
router.post('/items/:id', upload.single('image'), itemController.updateItem);

// Route to delete an existing item. use a POST request!!
router.post('/items/:id/delete', itemController.deleteItem);

router.get('/items/new', itemController.renderNewItemForm);

module.exports = router;
