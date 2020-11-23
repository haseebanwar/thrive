const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const path = require('path');

// load env variables
dotenv.config();

// connect DB
connectDB();

const app = express();

// body parser
app.use(express.json());

// API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/spoonacular', require('./routes/api/spoonacular'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Redirect to index.html for all routes except API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
