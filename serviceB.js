'use strict';

const express = require('express');
const multer = require('multer');
const path = require('node:path');
const app = express();
const port = 4000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save the uploaded files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file with a timestamp to avoid overwriting
  },
});

const upload = multer({ storage });

// Define an endpoint to handle file uploads
app.post('/upload', upload.single('pdf'), (req, res) => {
  console.log('PDF file received:', req.file.filename);
  res.send('PDF file received successfully');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
