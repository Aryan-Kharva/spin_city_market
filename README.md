🎵 Spin City Market - Vinyl Marketplace
Spin City Market is a full-stack web application where users can browse, list, and manage vinyl record listings. It provides a dynamic online marketplace for vinyl enthusiasts to discover new records, post their own for sale, and manage listings with ease.

🌐 Features
🖼️ Create Listings: Upload images and enter details for each vinyl (title, artist, condition, price, and more).

🔍 Search & Browse: Search through available vinyls using keywords in the title or description.

📝 Edit Listings: Update vinyl details, change images, or correct mistakes.

🗑️ Soft Delete: Items are marked inactive instead of being removed from the database.

📸 Image Upload: Uses multer to handle image uploads securely.

💅 Styled Views: Clean, user-friendly interface using EJS templating and CSS.

🛠️ Tech Stack
Backend: Node.js, Express.js, MongoDB (via Mongoose)

Frontend: EJS templates, HTML, CSS

Database: MongoDB Atlas

Middleware: Multer (for image uploads)

📁 File Structure Highlights
/routes: Handles all route definitions (itemRoutes.js)

/controllers: Business logic for item CRUD operations (itemController.js)

/models: Mongoose schema for vinyl items (itemModel.js)

/views: EJS templates for different views (e.g., index, items, new, edit, etc.)

🧪 Functional Highlights
Form validation with clear error messaging

404 and server error handling with custom error views

Data persistence through MongoDB Atlas, scoped to a specific marketplace collection​

🧰 Getting Started
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file (if using environment variables) or configure MongoDB URI directly in app.js.

Start the server:

bash
Copy
Edit
node app.js
Open browser and navigate to:

arduino
Copy
Edit
http://localhost:3000
