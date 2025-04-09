const express = require('express');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
const multer = require('multer');
const mongoose = require('mongoose');
let port = 3000;
let host = 'localhost';
const mongUri = 'mongodb+srv://admin:admin123@cluster0.g67ip.mongodb.net/project3?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB.
mongoose.connect(mongUri)
.then(()=>{ 
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
});
})
.catch(err=>console.log(err.message))

// storage for files uploads. (ta said to use multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// initialize multer
const upload = multer({ storage });

// Initialize Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/', itemRoutes);

// landing Page Route
app.get('/', (req, res) => {
    res.render('index', { searchQuery: '' });
});

// Handle unmatched endpoints - 404 Error
app.use((req, res) => {
    res.status(404).render('error', { 
        error: {
            status: 404,
            message: `The server cannot locate resource at ${req.originalUrl}`
        },
        searchQuery: ''
    });
});

// Error Handling for 404 - Page Not Found
// app.use((req, res) => {
//     const itemId = req.query.id || 'unknown';
//     res.status(404).render('error', { 
//         error: {
//             status: 404,
//             message: `There is no item with id: ${itemId}`
//         },
//         searchQuery: ''
//     });
// });

// handle middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).render('error', { 
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        },
        searchQuery: ''
    });
});





